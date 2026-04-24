'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Trash2, ArrowLeft, Save } from 'lucide-react';
import { useInstitutions } from '@/hooks/use-institutions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';

const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  duration: z.string().min(1, "Duration is required"),
  fees: z.string().min(1, "Fees are required"),
  eligibility: z.string().min(1, "Eligibility is required"),
  examsAccepted: z.array(z.string()).min(1, "At least one exam is required"),
});

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  type: z.enum(['School', 'Junior College', 'Engineering College', 'University']),
  establishmentYear: z.coerce.number().min(1800).max(new Date().getFullYear()),
  location: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    address: z.string().min(1, "Address is required"),
    mapUrl: z.string().url("Enter a valid URL").default('https://'),
  }),
  affiliations: z.array(z.string()).default([]),
  contact: z.object({
    phone: z.string().min(10, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email"),
    website: z.string().url("Enter a valid URL"),
  }),
  socialMedia: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  courses: z.array(courseSchema).min(1, "At least one course is required"),
  placements: z.object({
    averagePackage: z.string().optional(),
    highestPackage: z.string().optional(),
    topRecruiters: z.array(z.string()).optional(),
  }).nullable().optional(),
  infrastructure: z.object({
    library: z.boolean().default(false),
    hostel: z.boolean().default(false),
    labs: z.boolean().default(false),
    sportsComplex: z.boolean().default(false),
    cafeteria: z.boolean().default(false),
    wifi: z.boolean().default(false),
  }),
  campusLife: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  rating: z.coerce.number().min(1).max(5),
  description: z.string().min(10, "Description is required"),
  naacGrade: z.string().optional(),
  nirfRank: z.string().optional(),
});

type InstitutionFormValues = z.infer<typeof formSchema>;

const infrastructureItems = [
  { id: 'library', label: 'Library' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'labs', label: 'Labs' },
  { id: 'sportsComplex', label: 'Sports Complex' },
  { id: 'cafeteria', label: 'Cafeteria' },
  { id: 'wifi', label: 'WiFi' },
] as const;

export default function EditInstitutionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { institutions, updateInstitution } = useInstitutions();
  const { toast } = useToast();

  const institutionId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<InstitutionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'Engineering College',
      establishmentYear: 2000,
      location: { city: '', state: '', address: '', mapUrl: 'https://' },
      affiliations: [],
      contact: { phone: '', email: '', website: 'https://' },
      courses: [{ name: '', duration: '', fees: '', eligibility: '', examsAccepted: [''] }],
      placements: null,
      rating: 4.0,
      description: '',
      name: '',
      infrastructure: {
        library: true,
        hostel: true,
        labs: true,
        cafeteria: true,
        wifi: true,
        sportsComplex: false,
      },
      campusLife: [],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  useEffect(() => {
    if (institutionId && institutions.length > 0) {
      const institution = institutions.find(inst => inst.id === institutionId);
      if (institution) {
        // Map the institution data to form values
        form.reset({
          name: institution.name,
          type: institution.type,
          establishmentYear: institution.establishmentYear,
          location: {
            city: institution.location.city,
            state: institution.location.state,
            address: institution.location.address,
            mapUrl: institution.location.mapUrl || 'https://'
          },
          affiliations: institution.affiliations || [],
          contact: institution.contact,
          socialMedia: institution.socialMedia || {},
          courses: institution.courses.length > 0 ? institution.courses : [{ name: '', duration: '', fees: '', eligibility: '', examsAccepted: [''] }],
          placements: institution.placements ? {
            averagePackage: institution.placements.averagePackage,
            highestPackage: institution.placements.highestPackage,
            topRecruiters: institution.placements.topRecruiters,
          } : null,
          rating: institution.rating,
          description: institution.description,
          naacGrade: institution.naacGrade || '',
          nirfRank: institution.nirfRank || '',
          infrastructure: institution.infrastructure || {
            library: true,
            hostel: true,
            labs: true,
            cafeteria: true,
            wifi: true,
            sportsComplex: false,
          },
          campusLife: institution.campusLife || [],
          images: institution.images || [],
        });
      }
      setIsLoading(false);
    }
  }, [institutionId, institutions, form]);

  const onSubmit = async (values: InstitutionFormValues) => {
    if (!institutionId) return;

    setIsSaving(true);
    try {
      // Convert form data to match Institution type requirements
      const institutionData = {
        ...values,
        placements: values.placements && values.placements.averagePackage && values.placements.highestPackage
          ? {
            averagePackage: values.placements.averagePackage,
            highestPackage: values.placements.highestPackage,
            topRecruiters: values.placements.topRecruiters || [],
          }
          : null,
      };

      await updateInstitution(institutionId, institutionData);
      toast({
        title: "Success",
        description: "Institution updated successfully",
      });
      router.push('/admin/manage-institutions');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update institution",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addCourse = () => {
    append({
      name: '',
      duration: '',
      fees: '',
      eligibility: '',
      examsAccepted: [''],
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <p>Loading institution data...</p>
      </div>
    );
  }

  if (!institutionId) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <p>No institution ID provided</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/manage-institutions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Institutions
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Edit Institution</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Update institution information
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter institution name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select institution type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="School">School</SelectItem>
                            <SelectItem value="Junior College">Junior College</SelectItem>
                            <SelectItem value="Engineering College">Engineering College</SelectItem>
                            <SelectItem value="University">University</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="establishmentYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Establishment Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 2000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            placeholder="e.g., 4.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter institution description..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>
                  Enter the location details of the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Enter the contact details of the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Courses Offered</CardTitle>
                <CardDescription>
                  Add the courses offered by the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Course {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`courses.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science Engineering" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`courses.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 4 years" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`courses.${index}.fees`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fees</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., â80,000 per year" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`courses.${index}.eligibility`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Eligibility</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 10+2 with PCM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`courses.${index}.examsAccepted`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Exams Accepted</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., JEE Main, JEE Advanced"
                                value={field.value ? field.value.join(', ') : ''}
                                onChange={(e) => {
                                  const exams = e.target.value.split(',').map(exam => exam.trim()).filter(exam => exam.length > 0);
                                  field.onChange(exams);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCourse}
                  className="w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Another Course
                </Button>
              </CardContent>
            </Card>

            {/* Infrastructure */}
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Facilities</CardTitle>
                <CardDescription>
                  Select the infrastructure facilities available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="infrastructure"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {infrastructureItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name={`infrastructure.${item.id}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/manage-institutions">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
