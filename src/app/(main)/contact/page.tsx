'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We&apos;d love to hear from you! Whether you have a question, feedback, or need support, feel free to reach out.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="Your Email" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">Subject</label>
            <Input id="subject" placeholder="What is your message about?" />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
            <Textarea id="message" placeholder="Your message..." rows={6} />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
