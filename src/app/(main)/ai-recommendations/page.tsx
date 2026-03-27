
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, ServerCrash, Sparkles, University } from 'lucide-react';
import { motion } from 'framer-motion';
import { states, cities } from '@/lib/cities';
import { Institution } from '@/lib/types';
import { useInstitutions } from '@/hooks/use-institutions';

// This is the type for a single item in the recommendations array.
type Recommendation = {
  institutionId: string;
  institutionName: string;
  reason: string;
};

const formSchema = z.object({
  criteria: z.string().min(10, {
    message: 'Please describe your ideal institution in at least 10 characters.',
  }),
});

const allCities = Object.values(cities).flat();


export default function AiRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { institutions } = useInstitutions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criteria: '',
    },
  });

  // This is a manual/mock implementation of the AI feature.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const query = values.criteria.toLowerCase();
      let filteredInstitutions: Institution[] = [...institutions];

      // 1. Detect location keywords (states or cities)
      const queryWords = query.split(/\s+/);
      const foundState = states.find(s => query.includes(s.name.toLowerCase()));
      const foundCity = allCities.find(c => query.includes(c.toLowerCase()));
      
      let locationReason = '';

      if (foundCity) {
        filteredInstitutions = filteredInstitutions.filter(inst => inst.location.city.toLowerCase() === foundCity.toLowerCase());
        locationReason = ` in ${foundCity}`;
      } else if (foundState) {
        filteredInstitutions = filteredInstitutions.filter(inst => inst.location.state.toLowerCase() === foundState.name.toLowerCase());
        locationReason = ` in ${foundState.name}`;
      }

      // 2. Filter by other keywords within the location-filtered list
      const nonLocationKeywords = queryWords.filter(word => {
        if (foundCity && word === foundCity.toLowerCase()) return false;
        if (foundState && word === foundState.name.toLowerCase()) return false;
        return word.length > 3;
      });

      if (nonLocationKeywords.length > 0) {
          filteredInstitutions = filteredInstitutions.filter(inst => {
            const instText = `${inst.name} ${inst.type} ${inst.courses.map(c => c.name).join(' ')} ${inst.description}`.toLowerCase();
            return nonLocationKeywords.some(kw => instText.includes(kw));
        });
      }

      const newRecommendations: Recommendation[] = filteredInstitutions.slice(0, 3).map(inst => ({
        institutionId: inst.id,
        institutionName: inst.name,
        reason: `A strong candidate${locationReason} that matches your search for "${nonLocationKeywords.join(' ')}". It is a well-regarded ${inst.type}.`,
      }));


      if (newRecommendations.length === 0) {
        setError("Our manual search couldn't find any institutions matching your query. Try using simpler terms like 'engineering college in pune'.");
      }

      setRecommendations(newRecommendations);
    } catch (e) {
      setError("An unexpected error occurred during the manual search.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">AI Institution Recommendations</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Describe your ideal institution, and our AI will find the perfect match for you from our database.
        </p>
      </motion.div>

       <Card>
        <CardHeader>
          <CardTitle>Describe Your Dream Institution</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="criteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Criteria</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Find affordable engineering colleges in Maharashtra with good placements' or 'Best schools in Pune'"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Bot className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex justify-center">
            <Bot className="h-8 w-8 animate-pulse text-primary" />
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader className="flex-row items-center gap-4">
            <ServerCrash className="h-8 w-8 text-destructive" />
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Here are your recommendations:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <Link key={rec.institutionId} href={`/institution/${rec.institutionId}`} className="block rounded-lg border p-4 transition-all hover:bg-muted/50">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <University className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{rec.institutionName}</h3>
                        <p className="text-muted-foreground">{rec.reason}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
