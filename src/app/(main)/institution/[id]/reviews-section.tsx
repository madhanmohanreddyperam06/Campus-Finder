
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { Review } from '@/lib/types';
import { Star, User, Mail, Linkedin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

interface UserProfile {
  name: string;
  avatar?: string;
}

export function ReviewsSection({ reviews: initialReviews, onAddReview }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  
  useState(() => {
    setReviews(initialReviews)
  }, [initialReviews]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || newReview.trim() === '' || newRating === 0) return;

    const submittedReview: Review = {
      id: `review-${Date.now()}`,
      author: user.name,
      rating: newRating,
      date: new Date().toISOString(),
      comment: newReview,
    };

    onAddReview(submittedReview);
    setNewReview('');
    setNewRating(0);
  };
  
  const simulateLogin = (method: 'email' | 'linkedin') => {
    if (method === 'linkedin') {
        setUser({ name: 'Monu Kumar (via LinkedIn)'});
    } else {
        setUser({ name: 'Monu Kumar (via Email)'});
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-muted p-6 md:flex-row">
            <div className="flex flex-col items-center">
                <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                        key={star}
                        className={cn(
                            'h-6 w-6',
                            averageRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                        )}
                        />
                    ))}
                </div>
                 <p className="mt-1 text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
            </div>
            <Separator orientation="vertical" className="hidden h-20 md:block" />
             <Separator orientation="horizontal" className="block md:hidden" />
            <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">Leave your review</h3>
                <p className="text-sm text-muted-foreground">Share your experience to help others make better decisions.</p>
            </div>
        </div>

        {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
                 <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                    <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">You are signed in and can leave a review.</p>
                    </div>
                     <Button variant="link" onClick={() => setUser(null)} className="ml-auto">Sign out</Button>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Your Rating</label>
                    <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                        key={star}
                        className={cn(
                            'h-8 w-8 cursor-pointer transition-colors',
                            newRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground hover:text-yellow-300'
                        )}
                        onClick={() => setNewRating(star)}
                        />
                    ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="review-text" className="mb-2 block text-sm font-medium">
                    Your Review
                    </label>
                    <Textarea
                    id="review-text"
                    placeholder="Tell us about your experience..."
                    rows={4}
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    />
                </div>
                <div className="text-right">
                    <Button type="submit" disabled={!newReview.trim() || newRating === 0}>
                    Submit Review
                    </Button>
                </div>
            </form>
        ) : (
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">Sign in to leave a review</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Verify your identity</AlertDialogTitle>
                    <AlertDialogDescription>
                        To leave a review, please sign in. This helps us ensure that all reviews are from real people.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                         <Button onClick={() => simulateLogin('linkedin')}>
                            <Linkedin className="mr-2 h-4 w-4" />
                            Sign in with LinkedIn
                        </Button>
                        <Button variant="secondary" onClick={() => simulateLogin('email')}>
                            <Mail className="mr-2 h-4 w-4" />
                            Sign in with Email
                        </Button>
                    </div>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )}
        
        <Separator />

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">What others are saying</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.author}</p>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(review.date), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="my-1 flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-4 w-4',
                          review.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">Be the first to leave a review!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
