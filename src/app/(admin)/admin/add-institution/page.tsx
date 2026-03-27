
'use client';

import { useSearchParams } from 'next/navigation';
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
import { PlusCircle, Trash2 } from 'lucide-react';
import { useInstitutions } from '@/hooks/use-institutions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  duration: z.string().min(1, "Duration is required"),
  fees: z.string().min(1, "Fees are required"),
  eligibility: z.string().min(1, "Eligibility is required"),
  examsAccepted: z.string().min(1, "Exams are required"),
});

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  type: z.enum(['School', 'Junior College', 'Engineering College', 'University']),
  establishmentYear: z.coerce.number().min(1800).max(new Date().getFullYear()),
  location: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    address: z.string().min(1, "Address is required"),
  }),
  contact: z.object({
    phone: z.string().min(10, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email"),
    website: z.string().url("Enter a valid URL"),
  }),
  courses: z.array(courseSchema).min(1, "At least one course is required"),
  rating: z.coerce.number().min(1).max(5),
  description: z.string().min(10, "Description is required"),
  naacGrade: z.string().optional(),
  nirfRank: z.string().optional(),
  placements: z.object({
    averagePackage: z.string().optional(),
    highestPackage: z.string().optional(),
    topRecruiters: z.string().optional(),
  }).optional(),
  infrastructure: z.object({
    library: z.boolean().default(false),
    hostel: z.boolean().default(false),
    labs: z.boolean().default(false),
    sportsComplex: z.boolean().default(false),
    cafeteria: z.boolean().default(false),
    wifi: z.boolean().default(false),
  }),
  campusLife: z.string().optional(),
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


export default function AddInstitutionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addInstitution } = useInstitutions();
  const { toast } = useToast();

  const institutionType = searchParams.get('type') || 'Engineering College';

  const form = useForm<InstitutionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: institutionType as any,
      establishmentYear: 2000,
      location: { city: '', state: '', address: '' },
      contact: { phone: '', email: '', website: 'https://' },
      courses: [{ name: '', duration: '', fees: '', eligibility: '', examsAccepted: '' }],
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
      }
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  const onSubmit = (data: InstitutionFormValues) => {
    const newId = data.name.toLowerCase().replace(/\s+/g, '-');
    const newInstitution = {
      ...data,
      id: newId,
      location: { ...data.location, mapUrl: '' },
      placements: data.placements?.averagePackage ? {
        averagePackage: data.placements.averagePackage || '',
        highestPackage: data.placements.highestPackage || '',
        topRecruiters: data.placements.topRecruiters?.split(',').map(s => s.trim()) || [],
      } : null,
      infrastructure: data.infrastructure,
      campusLife: data.campusLife?.split(',').map(s => s.trim()) || [],
      images: ['https://picsum.photos/800/600?random=99'],
      reviews: [],
      affiliations: ['UGC', 'AICTE'], // Default affiliations
      courses: data.courses.map(c => ({...c, examsAccepted: c.examsAccepted.split(',').map(s => s.trim())}))
    };
    
    addInstitution(newInstitution);
    
    toast({
      title: "Institution Added!",
      description: `${data.name} has been successfully added to the list.`,
    });

    router.push('/admin/dashboard');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Add New Institution</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Institution Name</FormLabel><FormControl><Input placeholder="e.g., Indian Institute of Technology" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem><FormLabel>Institution Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Engineering College">Engineering College</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                      <SelectItem value="School">School</SelectItem>
                      <SelectItem value="Junior College">Junior College</SelectItem>
                    </SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="establishmentYear" render={({ field }) => (
                <FormItem><FormLabel>Establishment Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="rating" render={({ field }) => (
                <FormItem><FormLabel>Rating (1-5)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="naacGrade" render={({ field }) => (
                <FormItem><FormLabel>NAAC Grade (Optional)</FormLabel><FormControl><Input placeholder="e.g., A++" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="nirfRank" render={({ field }) => (
                <FormItem><FormLabel>NIRF Rank (Optional)</FormLabel><FormControl><Input placeholder="e.g., 5 (Engineering)" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="A brief description of the institution" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Location & Contact</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="location.address" render={({ field }) => (
                <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="location.city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="location.state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact.email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contact.website" render={({ field }) => (
                <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Courses Offered</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', duration: '', fees: '', eligibility: '', examsAccepted: '' })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                </Button>
              </div>
              <CardDescription>Add at least one course offered by the institution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border p-4 relative">
                   <h4 className="text-md font-semibold">Course #{index + 1}</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={form.control} name={`courses.${index}.name`} render={({ field }) => (
                        <FormItem><FormLabel>Course Name</FormLabel><FormControl><Input placeholder="e.g., Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                     <FormField control={form.control} name={`courses.${index}.duration`} render={({ field }) => (
                        <FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="e.g., 4 Years" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`courses.${index}.fees`} render={({ field }) => (
                        <FormItem><FormLabel>Fees</FormLabel><FormControl><Input placeholder="e.g., ₹8.5 Lakhs" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`courses.${index}.eligibility`} render={({ field }) => (
                        <FormItem><FormLabel>Eligibility</FormLabel><FormControl><Input placeholder="e.g., 10+2 with 75%" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`courses.${index}.examsAccepted`} render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>Exams Accepted (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., JEE Advanced, MHT-CET" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                   </div>
                   <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="absolute top-4 right-4">
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              ))}
              <FormMessage>{form.formState.errors.courses?.message}</FormMessage>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Placements</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="placements.averagePackage" render={({ field }) => (
                    <FormItem><FormLabel>Average Package (Optional)</FormLabel><FormControl><Input placeholder="e.g., ₹21.8 LPA" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="placements.highestPackage" render={({ field }) => (
                    <FormItem><FormLabel>Highest Package (Optional)</FormLabel><FormControl><Input placeholder="e.g., ₹3.67 CPA" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="placements.topRecruiters" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Top Recruiters (comma-separated, optional)</FormLabel><FormControl><Input placeholder="e.g., Google, Microsoft, Amazon" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Campus & Infrastructure</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="campusLife" render={({ field }) => (
                    <FormItem><FormLabel>Campus Life & Events (comma-separated, optional)</FormLabel><FormControl><Textarea placeholder="e.g., Techfest, Mood Indigo, Various clubs" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="space-y-2">
                    <FormLabel>Infrastructure Facilities</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {infrastructureItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name={`infrastructure.${item.id}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>{item.label}</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">Submit New Institution</Button>
        </form>
      </Form>
    </div>
  );
}

