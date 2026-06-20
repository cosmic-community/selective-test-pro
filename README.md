# Selective Test Pro

![App Preview](https://imgix.cosmicjs.com/5c9c51a0-6c83-11f1-a7b1-a329933c1eaf-autopilot-photo-1456513080510-7bf3a84b82f8-1781944687538.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive web application offering **NSW Selective School Practice Tests** with a free trial for students. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com), Selective Test Pro helps students prepare for selective entry exams across multiple subjects with interactive practice tests and detailed explanations.

## Features

- 🏠 **Beautiful Homepage** with hero section, subject overview, and featured free-trial tests
- 📚 **Test Subjects** browsing with custom icons and colors
- 📝 **Practice Tests** with difficulty levels, time limits, and instructions
- ❓ **Interactive Question Player** with multiple-choice questions, answer checking, and explanations
- 🆓 **Free Trial** badges highlighting tests available without payment
- 📊 **Real-time score tracking** during practice sessions
- 📱 **Fully responsive design** that works on all devices
- ⚡ **Server-side rendering** for fast loads and SEO

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3651325b2ac5cef3df9370&clone_repository=6a3652295b2ac5cef3df93a3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: NSW Selective Practice Tests Free Trial for Students"

### Code Generation Prompt

> Build a Next.js application for a website called "Selective Test Pro". The content is managed in Cosmic CMS with the following object types: test-subjects, practice-tests, questions. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: NSW Selective Practice Tests Free Trial for Students

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Cosmic SDK** for content management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd selective-test-pro

# Install dependencies
bun install

# Add your environment variables (see below)

# Run the development server
bun run dev
```

Set the following environment variables:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all practice tests with related subject data
const response = await cosmic.objects
  .find({ type: 'practice-tests' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch questions for a specific practice test
const questions = await cosmic.objects
  .find({ type: 'questions', 'metadata.practice_test': testId })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:

- **Test Subjects** (`test-subjects`) — categories like Mathematical Reasoning, Reading, etc.
- **Practice Tests** (`practice-tests`) — individual tests linked to subjects with difficulty and time limits
- **Questions** (`questions`) — multiple-choice questions linked to practice tests

Read more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add environment variables
4. Deploy

<!-- README_END -->