
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Briefcase, ServerCrash, Sparkles, User, BookOpen, Target, TrendingUp, Award, Users, Lightbulb, CheckCircle, ArrowRight, Star } from 'lucide-react';
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

This role is all about creating the user-facing part of websites and applications. Here's how you can get started:

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

const fullStackDeveloperResponse = `
### Want to be a Full Stack Developer? A versatile and in-demand role!

Full stack developers work on both frontend and backend, making them highly valuable to companies. Here's your roadmap:

**1. Direct Answer:**
To become a full stack developer, you need to master both frontend technologies (HTML, CSS, JavaScript, frameworks) and backend technologies (server-side languages, databases, APIs).

**2. Key Responsibilities:**
*   Building complete web applications from frontend to backend.
*   Designing and implementing APIs and database schemas.
*   Ensuring security, performance, and scalability across the entire stack.
*   Working with UI/UX designers and business stakeholders.

**3. Required Skills:**
*   **Frontend Skills:**
    *   HTML, CSS, JavaScript/TypeScript
    *   Modern frameworks (React, Angular, Vue.js)
    *   Responsive design and accessibility
*   **Backend Skills:**
    *   Server-side languages (Node.js, Python, Java, etc.)
    *   Databases (SQL and NoSQL)
    *   API development (REST, GraphQL)
*   **DevOps & Tools:**
    *   Version control (Git)
    *   Cloud platforms (AWS, Azure, GCP)
    *   Containerization (Docker)
    *   CI/CD pipelines

**4. Educational Steps:**
*   Start with frontend or backend fundamentals first, then expand.
*   Build full-stack projects that integrate both ends.
*   Learn system design and architecture patterns.
*   Consider full-stack bootcamps or comprehensive online courses.

**5. Future Scope:**
Full stack developers are increasingly valuable as companies look for versatile engineers. The trend toward serverless architectures and edge computing creates new opportunities. Specializing in emerging technologies like Web3 or AI integration can set you apart.
`;

const mobileDeveloperResponse = `
### Interested in Mobile Development? A rapidly growing field!

Mobile apps are everywhere, and skilled mobile developers are in high demand. Here's how to get started:

**1. Direct Answer:**
To become a mobile developer, choose a platform (iOS or Android) and master its specific programming language, tools, and frameworks.

**2. Key Career Paths:**
*   **iOS Developer:** Builds apps for iPhone and iPad using Swift/Objective-C.
*   **Android Developer:** Creates apps for Android devices using Kotlin/Java.
*   **Cross-Platform Developer:** Uses frameworks like React Native or Flutter to build for both platforms.

**3. Required Skills:**
*   **Platform-Specific Skills:**
    *   **iOS:** Swift, Xcode, UIKit, SwiftUI, Core Data
    *   **Android:** Kotlin, Android Studio, Jetpack Compose, Room
    *   **Cross-Platform:** React Native, Flutter, or Xamarin
*   **Common Skills:**
    *   Mobile UI/UX principles
    *   Performance optimization
    *   Memory management
    *   App store deployment and updates
*   **Additional Knowledge:**
    *   APIs and networking
    *   Local data storage
    *   Push notifications
    *   Security best practices

**4. Educational Steps:**
*   Choose your platform and start with official documentation.
*   Build simple apps and gradually increase complexity.
*   Study platform-specific design guidelines.
*   Consider mobile development bootcamps or specialized courses.

**5. Future Scope:**
Mobile development continues to evolve with 5G, AR/VR, and IoT integration. The rise of foldable devices and wearable technology creates new opportunities. Cross-platform tools are becoming more powerful, making it easier to target multiple platforms simultaneously.
`;

const uiuxDesignerResponse = `
### Want to be a UI/UX Designer? A creative and impactful career!

UI/UX designers shape how users interact with digital products, making them both beautiful and functional. Here's your path:

**1. Direct Answer:**
To become a UI/UX designer, you need a combination of design skills, user research abilities, and technical knowledge of design tools.

**2. Key Responsibilities:**
*   Conducting user research and usability testing.
*   Creating wireframes, prototypes, and high-fidelity designs.
*   Designing user interfaces and interaction patterns.
*   Collaborating with developers and product managers.

**3. Required Skills:**
*   **Design Skills:**
    *   Visual design principles (color, typography, layout)
    *   Prototyping and wireframing
    *   User research methodologies
    *   Information architecture
*   **Technical Skills:**
    *   Design tools (Figma, Sketch, Adobe XD)
    *   Basic understanding of HTML/CSS
    *   Animation and interaction design
*   **Soft Skills:**
    *   Empathy and user-centered thinking
    *   Communication and presentation skills
    *   Problem-solving and creativity

**4. Educational Steps:**
*   Learn design fundamentals through online courses or bootcamps.
*   Build a portfolio with case studies showing your process.
*   Practice with real projects or redesign existing apps.
*   Stay updated with design trends and guidelines.

**5. Future Scope:**
UI/UX design is becoming increasingly important as companies focus on user experience. The rise of voice interfaces, AR/VR, and AI-driven design creates new challenges and opportunities. Specializing in specific industries or emerging technologies can lead to exciting career paths.
`;

const cybersecurityAnalystResponse = `
### Interested in Cybersecurity? A critical and growing field!

Cybersecurity professionals protect digital assets from threats and attacks. Here's how to enter this vital field:

**1. Direct Answer:**
To become a cybersecurity analyst, you need knowledge of network security, threat detection, security tools, and compliance requirements.

**2. Key Career Paths:**
*   **Security Analyst:** Monitors and responds to security incidents.
*   **Penetration Tester:** Tests systems for vulnerabilities.
*   **Security Engineer:** Designs and implements security solutions.
*   **Security Consultant:** Advises organizations on security strategies.

**3. Required Skills:**
*   **Technical Skills:**
    *   Network security and protocols
    *   Security tools (firewalls, IDS/IPS, SIEM)
    *   Operating systems (Windows, Linux)
    *   Encryption and cryptography
    *   Scripting (Python, PowerShell)
*   **Knowledge Areas:**
    *   Threat intelligence and analysis
    *   Incident response procedures
    *   Compliance frameworks (GDPR, HIPAA)
    *   Risk assessment methodologies
*   **Soft Skills:**
    *   Attention to detail and analytical thinking
    *   Problem-solving under pressure
    *   Communication and documentation

**4. Educational Steps:**
*   Get certifications like CompTIA Security+, CISSP, or CEH.
*   Learn through hands-on practice in labs and simulations.
*   Study network and system administration fundamentals.
*   Join cybersecurity communities and stay updated on threats.

**5. Future Scope:**
Cybersecurity is more critical than ever with increasing cyber threats. The field is expanding with cloud security, IoT security, and AI-driven security solutions. There's a significant talent gap, making it a stable and well-compensated career choice.
`;

const cloudEngineerResponse = `
### Want to be a Cloud Engineer? Essential in modern tech!

Cloud engineers design, implement, and manage cloud infrastructure. Here's your path to this in-demand role:

**1. Direct Answer:**
To become a cloud engineer, master cloud platforms (AWS, Azure, GCP), infrastructure as code, and cloud security principles.

**2. Key Responsibilities:**
*   Designing and deploying cloud infrastructure.
*   Managing cloud services and resources.
*   Implementing security and compliance measures.
*   Optimizing cloud costs and performance.

**3. Required Skills:**
*   **Cloud Platforms:**
    *   AWS (EC2, S3, Lambda, RDS)
    *   Azure (VMs, Storage, Functions, SQL)
    *   Google Cloud (Compute Engine, Cloud Storage, Cloud Functions)
*   **Technical Skills:**
    *   Infrastructure as Code (Terraform, CloudFormation)
    *   Containerization (Docker, Kubernetes)
    *   CI/CD pipelines
    *   Monitoring and logging
*   **Foundational Knowledge:**
    *   Networking fundamentals
    *   Security best practices
    *   Cost optimization strategies
    *   Scripting and automation

**4. Educational Steps:**
*   Get cloud certifications (AWS Solutions Architect, Azure Administrator, etc.).
*   Set up a personal cloud account for hands-on practice.
*   Learn through official documentation and tutorials.
*   Build projects that use various cloud services.

**5. Future Scope:**
Cloud computing continues to grow with serverless, edge computing, and multi-cloud strategies. The rise of AI/ML services and cloud-native applications creates new opportunities. Specializing in specific cloud platforms or emerging technologies can lead to excellent career prospects.
`;

const dataAnalystResponse = `
### Want to be a Data Analyst? A gateway to data-driven insights!

Data analysts help organizations make informed decisions by analyzing and interpreting data. Here's how to start:

**1. Direct Answer:**
To become a data analyst, you need strong analytical skills, proficiency in data manipulation tools, and the ability to communicate insights effectively.

**2. Key Responsibilities:**
*   Collecting, cleaning, and organizing data.
*   Analyzing data to identify trends and patterns.
*   Creating reports and visualizations.
*   Presenting findings to stakeholders.

**3. Required Skills:**
*   **Technical Skills:**
    *   SQL for data retrieval and manipulation
    *   Excel/Google Sheets for analysis
    *   Python (Pandas, NumPy) or R for data analysis
    *   Data visualization tools (Tableau, Power BI, matplotlib)
*   **Analytical Skills:**
    *   Statistical analysis
    *   Problem-solving and critical thinking
    *   Attention to detail
*   **Communication Skills:**
    *   Data storytelling
    *   Report writing
    *   Presentation skills

**4. Educational Steps:**
*   Learn SQL and data manipulation techniques.
*   Master Excel/Google Sheets for basic analysis.
*   Take courses in statistics and data analysis.
*   Build a portfolio with data analysis projects.

**5. Future Scope:**
Data analysis is fundamental to business decision-making. The field is evolving with big data technologies and AI-powered analytics tools. There's growing demand for analysts who can work with real-time data and provide actionable insights quickly.
`;

const productManagerResponse = `
### Interested in Product Management? A strategic and influential role!

Product managers guide product development from conception to launch, balancing business goals with user needs. Here's your path:

**1. Direct Answer:**
To become a product manager, you need a combination of business acumen, technical understanding, user empathy, and leadership skills.

**2. Key Responsibilities:**
*   Defining product vision and strategy.
*   Conducting market research and user analysis.
*   Creating product roadmaps and prioritizing features.
*   Collaborating with engineering, design, and marketing teams.

**3. Required Skills:**
*   **Business Skills:**
    *   Market analysis and competitive research
    *   Business case development
    *   Metrics and KPI tracking
    *   Budget management
*   **Technical Skills:**
    *   Understanding of software development lifecycle
    *   Basic knowledge of APIs and databases
    *   Familiarity with agile methodologies
*   **Soft Skills:**
    *   Leadership and team management
    *   Communication and stakeholder management
    *   Problem-solving and decision-making
    *   User empathy and customer focus

**4. Educational Steps:**
*   Gain experience in related roles (engineering, design, business analysis).
*   Learn product management frameworks and methodologies.
*   Develop business and technical knowledge through courses.
*   Build a network in the product management community.

**5. Future Scope:**
Product management is becoming more data-driven and user-centric. The rise of AI products, platform ecosystems, and digital transformation creates new challenges. Product managers who can balance technical feasibility with business viability and user desirability will be highly valued.
`;

const qaEngineerResponse = `
### Want to be a QA Engineer? Essential for quality software!

QA engineers ensure software quality through systematic testing and quality assurance processes. Here's how to enter this field:

**1. Direct Answer:**
To become a QA engineer, you need testing methodologies, automation skills, attention to detail, and understanding of software development processes.

**2. Key Responsibilities:**
*   Designing and executing test plans and test cases.
*   Automating test processes using testing frameworks.
*   Identifying, documenting, and tracking bugs.
*   Ensuring software meets quality standards and requirements.

**3. Required Skills:**
*   **Testing Skills:**
    *   Manual testing techniques
    *   Test automation frameworks (Selenium, Cypress, Playwright)
    *   Performance and load testing
    *   API testing tools (Postman, Insomnia)
*   **Technical Skills:**
    *   Programming languages (Python, JavaScript, Java)
    *   Understanding of databases and APIs
    *   Version control systems
    *   CI/CD pipelines
*   **Soft Skills:**
    *   Attention to detail and analytical thinking
    *   Communication and documentation
    *   Problem-solving and critical thinking

**4. Educational Steps:**
*   Learn software testing methodologies and best practices.
*   Get certifications like ISTQB or CSTE.
*   Practice with open-source testing tools.
*   Gain experience through internships or entry-level positions.

**5. Future Scope:**
QA is evolving toward quality engineering with a focus on "shifting left" - testing earlier in the development cycle. The rise of AI in testing, DevOps practices, and continuous testing creates new opportunities. QA engineers who can combine technical skills with business understanding will be highly valued.
`;

const blockchainDeveloperResponse = `
### Interested in Blockchain Development? A cutting-edge field!

Blockchain developers build decentralized applications and smart contracts. Here's your path to this emerging field:

**1. Direct Answer:**
To become a blockchain developer, learn blockchain fundamentals, smart contract programming, and decentralized application development.

**2. Key Career Paths:**
*   **Smart Contract Developer:** Writes and deploys smart contracts.
*   **DApp Developer:** Builds decentralized applications.
*   **Blockchain Engineer:** Works on blockchain infrastructure.
*   **Web3 Developer:** Integrates blockchain with web applications.

**3. Required Skills:**
*   **Blockchain Fundamentals:**
    *   Understanding of distributed ledgers and consensus mechanisms
    *   Cryptography basics
    *   Token standards (ERC-20, ERC-721)
*   **Technical Skills:**
    *   Smart contract languages (Solidity, Rust)
    *   Blockchain platforms (Ethereum, Solana, Polygon)
    *   Web3 libraries (Web3.js, Ethers.js)
    *   Frontend development for DApps
*   **Additional Knowledge:**
    *   Decentralized finance (DeFi) concepts
    *   NFT development
    *   Security best practices
    *   Gas optimization techniques

**4. Educational Steps:**
*   Start with blockchain fundamentals through online courses.
*   Learn Solidity and practice on testnets.
*   Build simple smart contracts and DApps.
*   Join blockchain communities and contribute to projects.

**5. Future Scope:**
Blockchain technology is expanding beyond cryptocurrency into areas like supply chain, healthcare, and digital identity. The rise of Web3, DeFi, and NFTs creates new opportunities. Developers who can build secure and scalable blockchain solutions will be in high demand.
`;

const gameDeveloperResponse = `
### Want to be a Game Developer? A creative and technical career!

Game developers create interactive entertainment experiences. Here's how to enter this exciting field:

**1. Direct Answer:**
To become a game developer, learn game engines, programming languages, mathematics, and game design principles.

**2. Key Career Paths:**
*   **Game Programmer:** Implements game logic and mechanics.
*   **Graphics Programmer:** Works on rendering and visual effects.
*   **Game Designer:** Creates game concepts and mechanics.
*   **Technical Artist:** Bridges art and programming.

**3. Required Skills:**
*   **Technical Skills:**
    *   Game engines (Unity, Unreal Engine, Godot)
    *   Programming languages (C#, C++, Python)
    *   Mathematics (linear algebra, trigonometry)
    *   Physics and collision detection
*   **Creative Skills:**
    *   Game design principles
    *   Level design
    *   User interface design
    *   Storytelling and narrative design
*   **Additional Knowledge:**
    *   3D modeling and animation basics
    *   Audio integration
    *   Performance optimization
    *   Multi-platform development

**4. Educational Steps:**
*   Learn game engines through official tutorials.
*   Start with simple games and gradually increase complexity.
*   Study game design theory and player psychology.
*   Build a portfolio of game projects.

**5. Future Scope:**
Game development is evolving with VR/AR, cloud gaming, and AI-driven content generation. The rise of indie games and mobile gaming creates diverse opportunities. Developers who can combine technical skills with creative vision will thrive in this dynamic industry.
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

function renderStructuredResponse(response: string): React.ReactNode {
  const lines = response.split('\n').filter(line => line.trim());
  const sections: React.ReactNode[] = [];
  let currentSection: React.ReactNode[] = [];
  let currentTitle = '';
  let sectionIndex = 0;

  const getIconForSection = (title: string) => {
    if (title.includes('Key Career Paths') || title.includes('Key Responsibilities')) return <Target className="h-5 w-5" />;
    if (title.includes('Required Skills')) return <Award className="h-5 w-5" />;
    if (title.includes('Educational Steps')) return <BookOpen className="h-5 w-5" />;
    if (title.includes('Future Scope')) return <TrendingUp className="h-5 w-5" />;
    if (title.includes('Academic Quality') || title.includes('Placements')) return <Users className="h-5 w-5" />;
    if (title.includes('Campus Life') || title.includes('Location')) return <Lightbulb className="h-5 w-5" />;
    return <Star className="h-5 w-5" />;
  };

  const getColorForSection = (title: string) => {
    if (title.includes('Key Career Paths') || title.includes('Key Responsibilities')) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (title.includes('Required Skills')) return 'bg-green-50 border-green-200 text-green-700';
    if (title.includes('Educational Steps')) return 'bg-purple-50 border-purple-200 text-purple-700';
    if (title.includes('Future Scope')) return 'bg-orange-50 border-orange-200 text-orange-700';
    if (title.includes('Academic Quality') || title.includes('Placements')) return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    if (title.includes('Campus Life') || title.includes('Location')) return 'bg-pink-50 border-pink-200 text-pink-700';
    return 'bg-gray-50 border-gray-200 text-gray-700';
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Main heading
    if (trimmedLine.startsWith('### ')) {
      if (currentSection.length > 0) {
        sections.push(
          <Card key={`section-${sectionIndex}`} className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                {getIconForSection(currentTitle)}
                {currentTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentSection}
            </CardContent>
          </Card>
        );
      }
      currentTitle = trimmedLine.substring(4);
      currentSection = [];
      sectionIndex++;
    }
    // Sub-heading
    else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      const content = trimmedLine.replace(/\*\*/g, '');
      currentSection.push(
        <h4 key={index} className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" />
          {content}
        </h4>
      );
    }
    // List items
    else if (trimmedLine.startsWith('*   ')) {
      const content = trimmedLine.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      currentSection.push(
        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }
    // Regular paragraphs
    else if (trimmedLine.length > 0) {
      const content = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      currentSection.push(
        <p key={index} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      );
    }
  });

  // Add the last section
  if (currentSection.length > 0) {
    sections.push(
      <Card key={`section-${sectionIndex}`} className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            {getIconForSection(currentTitle)}
            {currentTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSection}
        </CardContent>
      </Card>
    );
  }

  return <div className="space-y-6">{sections}</div>;
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

      // Enhanced keyword-based logic for comprehensive career guidance
      if (lowerCaseQuery.includes('data scientist') || lowerCaseQuery.includes('data science')) {
        aiResponse = dataScientistResponse;
      } else if (lowerCaseQuery.includes('frontend') || lowerCaseQuery.includes('front-end') || lowerCaseQuery.includes('front end')) {
        aiResponse = frontendDeveloperResponse;
      } else if (lowerCaseQuery.includes('backend') || lowerCaseQuery.includes('back-end') || lowerCaseQuery.includes('back end')) {
        aiResponse = backendDeveloperResponse;
      } else if (lowerCaseQuery.includes('full stack') || lowerCaseQuery.includes('fullstack')) {
        aiResponse = fullStackDeveloperResponse;
      } else if (lowerCaseQuery.includes('mobile') || lowerCaseQuery.includes('ios') || lowerCaseQuery.includes('android')) {
        aiResponse = mobileDeveloperResponse;
      } else if (lowerCaseQuery.includes('ui ux') || lowerCaseQuery.includes('ux') || lowerCaseQuery.includes('designer')) {
        aiResponse = uiuxDesignerResponse;
      } else if (lowerCaseQuery.includes('cybersecurity') || lowerCaseQuery.includes('cyber security') || lowerCaseQuery.includes('security analyst')) {
        aiResponse = cybersecurityAnalystResponse;
      } else if (lowerCaseQuery.includes('cloud') || lowerCaseQuery.includes('aws') || lowerCaseQuery.includes('azure') || lowerCaseQuery.includes('gcp')) {
        aiResponse = cloudEngineerResponse;
      } else if (lowerCaseQuery.includes('data analyst') || lowerCaseQuery.includes('data analysis')) {
        aiResponse = dataAnalystResponse;
      } else if (lowerCaseQuery.includes('product manager') || lowerCaseQuery.includes('product management')) {
        aiResponse = productManagerResponse;
      } else if (lowerCaseQuery.includes('qa') || lowerCaseQuery.includes('quality assurance') || lowerCaseQuery.includes('testing')) {
        aiResponse = qaEngineerResponse;
      } else if (lowerCaseQuery.includes('blockchain') || lowerCaseQuery.includes('web3') || lowerCaseQuery.includes('nft') || lowerCaseQuery.includes('defi')) {
        aiResponse = blockchainDeveloperResponse;
      } else if (lowerCaseQuery.includes('game') || lowerCaseQuery.includes('gaming') || lowerCaseQuery.includes('unity') || lowerCaseQuery.includes('unreal')) {
        aiResponse = gameDeveloperResponse;
      } else if (lowerCaseQuery.includes('software engineer') || lowerCaseQuery.includes('software developer') || lowerCaseQuery.includes('programming')) {
        aiResponse = softwareEngineerResponse;
      } else if (lowerCaseQuery.includes('devops') || lowerCaseQuery.includes('ci/cd') || lowerCaseQuery.includes('kubernetes')) {
        aiResponse = devopsEngineerResponse;
      } else if (lowerCaseQuery.includes('machine learning') || lowerCaseQuery.includes('ml engineer') || lowerCaseQuery.includes('artificial intelligence')) {
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
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-primary flex items-center gap-2">
                  AI Career Guide's Response
                  <Badge variant="secondary" className="text-xs">Expert Advice</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Personalized career guidance based on your query</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {renderStructuredResponse(entry.response)}
            </CardContent>
          </Card>
          {index < conversation.length - 1 && <Separator className="my-8" />}
        </motion.div>
      ))}
    </div>
  );
}
