
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Briefcase, ServerCrash, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  query: z.string().min(10, {
    message: 'Please ask a clear career-related question (at least 10 characters).',
  }),
});

// Pre-written responses for various roles

const dataScientistResponse = `
### So, you want to be a Data Scientist? Great choice!

It's a rewarding career path with high demand. Here's a breakdown to get you started:

**1. Direct Answer:**
To become a data scientist, you need a blend of skills in programming, statistics, and machine learning, along with domain knowledge in a specific industry.

**2. Key Career Paths:**
*   **Data Analyst:** Focuses on interpreting data to find actionable insights.
*   **Machine Learning Engineer:** Builds and deploys machine learning models.
*   **Data Engineer:** Creates and manages data pipelines and infrastructure.
*   **Research Scientist:** Focuses on creating new algorithms and advancing the field.

**3. Required Skills:**
*   **Technical Skills:**
    *   **Programming:** Python (with libraries like Pandas, NumPy, Scikit-learn) and R are essential.
    *   **Databases:** SQL is a must-have for data retrieval.
    *   **Statistics:** Strong understanding of probability, hypothesis testing, and statistical modeling.
    *   **Machine Learning:** Knowledge of algorithms like regression, classification, and clustering.
*   **Soft Skills:**
    *   Problem-solving and critical thinking.
    *   Communication and storytelling with data.
    *   Business acumen.

**4. Educational Steps:**
*   A Bachelor's degree in Computer Science, Statistics, Mathematics, or a related field is a good start.
*   Consider a Master's degree or a specialized bootcamp in Data Science or Analytics.
*   Online certifications from platforms like Coursera, edX, or Udacity can be very valuable.

**5. Future Scope:**
The field is constantly evolving with the rise of AI. Specializing in areas like Deep Learning, Natural Language Processing (NLP), or Big Data will open up even more opportunities. Good luck!
`;

const frontendDeveloperResponse = `
### So, you want to be a Frontend Developer? Excellent!

This role is all about creating the user-facing part of websites and applications. Here’s how you can get started:

**1. Direct Answer:**
To become a frontend developer, you'll need to master the core technologies of the web—HTML, CSS, and JavaScript—and become proficient with modern frameworks like React, Angular, or Vue.js.

**2. Key Responsibilities:**
*   Developing user-friendly interfaces using web technologies.
*   Ensuring the technical feasibility of UI/UX designs.
*   Optimizing applications for maximum speed and scalability.
*   Collaborating with backend developers and designers to improve usability.

**3. Required Skills:**
*   **Technical Skills:**
    *   **Languages:** HTML, CSS, JavaScript (and often TypeScript).
    *   **Frameworks:** Proficiency in at least one major framework like React, Angular, or Vue.js. Next.js for React is very popular.
    *   **Styling:** Knowledge of CSS preprocessors (Sass) and CSS-in-JS libraries or utility-first frameworks like Tailwind CSS.
    *   **Tools:** Familiarity with build tools (Webpack, Vite), version control (Git), and package managers (npm, yarn).
*   **Soft Skills:**
    *   Attention to detail and a good eye for design.
    *   Problem-solving skills.
    *   Good communication skills to work with a team.

**4. Educational Steps:**
*   A Bachelor's degree in Computer Science is helpful but not always required. Many successful developers are self-taught.
*   Build a strong portfolio of projects to showcase your skills. This is often more important than a degree.
*   Online bootcamps and courses on platforms like freeCodeCamp, The Odin Project, and Coursera are excellent resources.

**5. Future Scope:**
Frontend development is always evolving. The rise of WebAssembly, Progressive Web Apps (PWAs), and server-side rendering frameworks keeps the field exciting. There's a high demand for skilled frontend developers.
`;

const backendDeveloperResponse = `
### Thinking of becoming a Backend Developer? Fantastic choice!

This role is the engine room of any application, handling logic, databases, and APIs. Here's what you need to know:

**1. Direct Answer:**
To become a backend developer, you need to be proficient in a server-side programming language, understand databases, and know how to create and manage APIs that power the frontend.

**2. Key Responsibilities:**
*   Writing server-side logic and APIs.
*   Designing and managing databases.
*   Ensuring the application is secure, scalable, and performant.
*   Integrating with third-party services.

**3. Required Skills:**
*   **Technical Skills:**
    *   **Languages:** Choose one or two to master, such as Node.js (with JavaScript/TypeScript), Python (with Django/Flask), Java (with Spring), Go, or Ruby.
    *   **Databases:** Knowledge of both SQL (like PostgreSQL, MySQL) and NoSQL (like MongoDB, Redis) databases.
    *   **APIs:** Deep understanding of RESTful APIs and/or GraphQL.
    *   **Architecture:** Familiarity with concepts like microservices, serverless architecture, and system design.
    *   **Cloud & DevOps:** Basic knowledge of cloud platforms (AWS, Google Cloud, Azure) and containerization (Docker).
*   **Soft Skills:**
    *   Strong logical and analytical thinking.
    *   System-level problem-solving.
    *   Collaboration with frontend and DevOps teams.

**4. Educational Steps:**
*   A Bachelor's degree in Computer Science or a related field is highly recommended as it provides a strong theoretical foundation.
*   Build complex projects that involve databases and APIs.
*   Contribute to open-source projects to gain experience.
*   Certifications in cloud platforms (e.g., AWS Certified Developer) can be a big plus.

**5. Future Scope:**
The demand for backend developers is evergreen. As applications become more complex and data-driven, the need for skilled backend engineers who can build robust and scalable systems will only increase. Specializing in areas like distributed systems or cloud-native development is a great career move.
`;

const softwareEngineerResponse = `
### Aiming to be a Software Engineer or Software Developer? A classic and solid path!

This is a broad role that involves designing, developing, and maintaining software systems. Here's the general roadmap:

**1. Direct Answer:**
A software engineer applies engineering principles to the entire software development lifecycle. This involves more than just coding; it includes requirements gathering, design, testing, and maintenance.

**2. Key Responsibilities:**
*   Designing and architecting software systems.
*   Writing clean, efficient, and maintainable code.
*   Collaborating with product managers, designers, and other engineers.
*   Testing software to ensure it's free of bugs.
*   Maintaining and improving existing software.

**3. Required Skills:**
*   **Technical Skills:**
    *   **Data Structures & Algorithms:** This is the absolute foundation. You must have a strong grasp of concepts like arrays, linked lists, trees, sorting, and searching.
    *   **Programming:** Proficiency in one or more languages like Python, Java, C++, or JavaScript.
    *   **Software Development Lifecycle:** Understanding of Agile, Scrum, and other development methodologies.
    *   **Version Control:** Fluency in Git is non-negotiable.
    *   **Testing:** Knowledge of unit testing, integration testing, and other testing principles.
*   **Soft Skills:**
    *   Excellent problem-solving abilities.
    *   Teamwork and collaboration.
    *   Adaptability and a willingness to learn new technologies.

**4. Educational Steps:**
*   A Bachelor's degree in Computer Science is the most common and recommended path, as it provides a strong theoretical foundation.
*   Participate in coding competitions (e.g., on LeetCode, HackerRank) to sharpen your problem-solving skills.
*   Internships are crucial for gaining real-world experience before you graduate.

**5. Future Scope:**
Software engineering is the backbone of the tech industry. Opportunities are vast and can lead to specializations in frontend, backend, mobile, AI, and more. It offers strong career growth, with paths leading to senior engineer, architect, or management roles.
`;

const devopsEngineerResponse = `
### Interested in becoming a DevOps Engineer? You're stepping into a crucial and high-demand field!

DevOps is a culture and practice that bridges the gap between software development (Dev) and IT operations (Ops).

**1. Direct Answer:**
To become a DevOps engineer, you need a blend of skills from both development and systems administration. Your goal is to automate and streamline the software delivery pipeline, from code commit to deployment.

**2. Key Responsibilities:**
*   Managing and automating CI/CD (Continuous Integration/Continuous Deployment) pipelines.
*   Managing cloud infrastructure (Infrastructure as Code).
*   Monitoring application performance and reliability.
*   Ensuring the security and scalability of the infrastructure.

**3. Required Skills:**
*   **Technical Skills:**
    *   **Cloud Platforms:** Deep knowledge of at least one major cloud provider (AWS, Google Cloud, or Azure).
    *   **CI/CD Tools:** Proficiency with tools like Jenkins, GitLab CI, or GitHub Actions.
    *   **Infrastructure as Code (IaC):** Expertise in tools like Terraform or Ansible.
    *   **Containerization:** Mastery of Docker and container orchestration with Kubernetes.
    *   **Scripting:** Strong scripting skills in languages like Bash, Python, or Go.
    *   **Monitoring:** Experience with tools like Prometheus, Grafana, or Datadog.
*   **Soft Skills:**
    *   A collaborative mindset is essential.
    *   Strong communication skills to work with both developers and operations teams.
    *   A passion for automation and efficiency.

**4. Educational Steps:**
*   Many DevOps engineers start as either software developers or system administrators and then transition.
*   A degree in Computer Science or IT provides a good foundation.
*   Certifications are highly valued in this field. Consider AWS Certified DevOps Engineer, Certified Kubernetes Administrator (CKA), or Terraform Associate.
*   Hands-on experience is key. Set up your own CI/CD pipelines for personal projects.

**5. Future Scope:**
DevOps is at the heart of modern software development. As more companies move to the cloud and adopt microservices, the demand for DevOps engineers will continue to soar. It's a field with excellent career prospects and compensation.
`;

const machineLearningEngineerResponse = `
### So you're drawn to Machine Learning Engineering? An exciting and cutting-edge choice!

This role focuses on taking machine learning models from prototype to production.

**1. Direct Answer:**
A Machine Learning (ML) Engineer is a specialized software engineer who designs, builds, and deploys production-ready ML systems. You'll need strong software engineering skills combined with a solid understanding of machine learning concepts.

**2. Key Responsibilities:**
*   Designing and implementing scalable ML pipelines.
*   Deploying ML models as APIs or integrated services.
*   Monitoring and maintaining models in production to ensure performance.
*   Collaborating with data scientists to productionize their models.
*   Optimizing models for performance (latency, throughput).

**3. Required Skills:**
*   **Technical Skills:**
    *   **Programming:** Expert-level Python is the standard.
    *   **ML Frameworks:** Deep knowledge of frameworks like TensorFlow, PyTorch, and Scikit-learn.
    *   **Software Engineering:** Strong skills in data structures, algorithms, and system design.
    *   **MLOps:** Experience with tools and practices for managing the ML lifecycle (e.g., MLflow, Kubeflow, or cloud-native tools like Vertex AI/SageMaker).
    *   **Big Data:** Familiarity with technologies like Spark for processing large datasets.
*   **Soft Skills:**
    *   Strong problem-solving skills, especially for debugging complex systems.
    *   Collaboration with both research-focused data scientists and operations teams.
    *   A practical, results-oriented mindset.

**4. Educational Steps:**
*   A Bachelor's or Master's degree in Computer Science is highly recommended.
*   Start with a strong foundation in software engineering, then specialize in ML.
*   Gain experience by working on end-to-end ML projects, from data collection to deployment.
*   Contribute to open-source ML libraries or build your own ML-powered applications.

**5. Future Scope:**
As AI becomes more integrated into every product, the role of the ML Engineer is becoming one of the most critical in tech. It's a rapidly growing field with immense opportunities for impact and career advancement.
`;

const selectingInstitutionResponse = `
### Choosing the Right Institution: Key Factors to Consider

Selecting the right college or university is a major decision. Here are the most important parameters to look out for to make an informed choice:

**1. Academic Quality & Programs:**
*   **Accreditation:** Ensure the institution is recognized by bodies like UGC, AICTE, and has a good NAAC grade. This guarantees a certain standard of quality.
*   **NIRF Ranking:** Check the National Institutional Ranking Framework (NIRF) rankings for your desired stream (e.g., Engineering, Medical, University).
*   **Faculty Quality:** Look for experienced and well-qualified faculty. Check their profiles on the institution's website.
*   **Curriculum:** Is the curriculum up-to-date and relevant to the industry? Does it offer flexibility or specializations?

**2. Placements & Career Opportunities:**
*   **Placement Statistics:** Look for the average and highest salary packages. What percentage of students get placed?
*   **Top Recruiters:** Which companies visit the campus for recruitment? This indicates the institution's industry connections.
*   **Alumni Network:** A strong alumni network can be a huge asset for future career opportunities.

**3. Campus Life & Infrastructure:**
*   **Facilities:** Check for essential facilities like a well-stocked library, modern labs, Wi-Fi, and sports complexes.
*   **Hostel:** If you plan to stay on campus, look into the quality of hostel accommodation and mess food.
*   **Campus Culture:** Is the environment vibrant and diverse? Are there clubs, societies, and events that match your interests?

**4. Location & Cost:**
*   **Location:** Consider the city's cost of living, safety, and connectivity.
*   **Fees & ROI:** Evaluate the total cost of the program (tuition, hostel, etc.) against the potential return on investment from placements.
*   **Scholarships:** Does the institution offer scholarships or financial aid?

**How to use Campus Finder:**
You can find most of this information right here on our platform! Check the detailed institution pages for rankings, placements, courses, and infrastructure.
`;

const collegeForCourseResponse = `
### How to Find the Right College for a Course

Finding the best college for the course you want to study is crucial. Here's a step-by-step guide on how to do it using Campus Finder:

**1. Use the 'Course' Search Filter:**
*   Navigate to the **Search** page from the main menu.
*   Select the **'Course'** tab in the search panel.
*   First, select the **Institution Type** (e.g., 'Engineering College').
*   Then, from the 'Select Course' dropdown, choose the specific course you're interested in (e.g., 'Computer Science and Engineering').
*   Click the **'Search by Course'** button to see all institutions of that type offering your chosen course.

**2. Filter by Location:**
*   If you have a preferred location, use the **'Location'** search tab.
*   Select the institution type, the state, and optionally the city.
*   After you get the results, you can visit the individual pages of those colleges to see if they offer the course you want.

**3. Review the Results:**
*   Once you have a list of colleges, click on each one to visit its detailed page.
*   On the institution's page, go to the **'Courses & Fees'** tab to see all the programs they offer, along with details like duration, fees, and eligibility.

**4. Compare Your Options:**
*   As you find colleges you like, use the **'Add to Compare'** button (the icon with two arrows).
*   Once you have selected two colleges, go to the **'Compare'** page from the user menu to see a side-by-side analysis of their features, helping you make the final decision.

By following these steps, you can efficiently narrow down the best institutions for your desired field of study.
`;

const genericResponse = `
### Thanks for your question!

Here is some general career guidance based on your query:

**1. Identify Your Interests:**
Start by exploring what you're passionate about. What subjects did you enjoy in school? What problems do you want to solve?

**2. Research Potential Career Paths:**
Once you have an idea of your interests, look up careers related to them. Websites like LinkedIn, Glassdoor, and career counseling portals can be very helpful.

**3. Build Relevant Skills:**
Every career requires a specific set of skills. Identify the key skills for your desired path and start learning them. This could be through:
*   Formal education (degrees, diplomas).
*   Online courses and certifications.
*   Internships and hands-on projects.

**4. Network with Professionals:**
Connect with people who are already working in the fields that interest you. They can provide valuable insights and advice.

This is a general guide. For more specific advice, please try asking a more detailed question, for example: "What skills do I need to become a data scientist?"
`;

function markdownToHtml(markdown: string): string {
    return markdown
        .trim()
        .split('\n')
        .map(line => {
            // Headings
            if (line.startsWith('### ')) {
                return `<h3>${line.substring(4)}</h3>`;
            }
            if (line.startsWith('## ')) {
                return `<h2>${line.substring(3)}</h2>`;
            }
            if (line.startsWith('# ')) {
                return `<h1>${line.substring(2)}</h1>`;
            }

            // Bold text
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // List items
            if (line.startsWith('*   ')) {
                return `<li>${line.substring(4)}</li>`;
            }
            
            // Paragraphs
            if (line.trim() === '') {
                return '<br />';
            }
            return `<p>${line}</p>`;
        })
        .join('')
        .replace(/<\/li><p>/g, '</li><li>') // fix for lists with paragraphs
        .replace(/<\/p><li>/g, '</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/<\/ul><ul>/g, ''); // Join adjacent lists
}

export default function AiCareerGuidePage() {
  const [conversation, setConversation] = useState<{ query: string; response: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    // Simulate network delay and AI "thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      let aiResponse = '';
      const lowerCaseQuery = values.query.toLowerCase();

      // Manual keyword-based logic
      if (lowerCaseQuery.includes('data scientist')) {
        aiResponse = dataScientistResponse;
      } else if (lowerCaseQuery.includes('frontend') || lowerCaseQuery.includes('front-end')) {
        aiResponse = frontendDeveloperResponse;
      } else if (lowerCaseQuery.includes('backend') || lowerCaseQuery.includes('back-end')) {
        aiResponse = backendDeveloperResponse;
      } else if (lowerCaseQuery.includes('software engineer') || lowerCaseQuery.includes('software developer')) {
        aiResponse = softwareEngineerResponse;
      } else if (lowerCaseQuery.includes('devops')) {
        aiResponse = devopsEngineerResponse;
      } else if (lowerCaseQuery.includes('machine learning') || lowerCaseQuery.includes('ml engineer')) {
        aiResponse = machineLearningEngineerResponse;
      } else if (lowerCaseQuery.includes('selecting') || lowerCaseQuery.includes('choosing') || lowerCaseQuery.includes('parameters')) {
        aiResponse = selectingInstitutionResponse;
      } else if (lowerCaseQuery.includes('suitable for') || lowerCaseQuery.includes('college for')) {
        aiResponse = collegeForCourseResponse;
      } else {
        aiResponse = genericResponse;
      }

      setConversation(prev => [...prev, { query: values.query, response: aiResponse }]);
      form.reset();

    } catch (e) {
      setError('An unexpected error occurred while generating the response.');
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
          <Briefcase className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">AI Career Guide</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal AI-powered assistant for all your career-related questions.
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your career question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'What skills do I need to become a frontend developer?' or 'How do I choose a good college?'"
                        rows={4}
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
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Guidance
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
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

      {conversation.slice().reverse().map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="h-6 w-6 text-primary" />
              <CardTitle>Your Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{entry.query}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle>AI Career Guide's Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-h3:text-lg"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(entry.response) }}
              />
            </CardContent>
          </Card>
           {index < conversation.length - 1 && <Separator className="my-8" />}
        </motion.div>
      ))}
    </div>
  );
}
