import { ArrowRight, CheckCircle2, Layers, MessageSquare, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Smart Project Management',
    description: 'Plan, prioritize, and deliver with a clean board view, progress tracking, and deadline visibility.',
    icon: Layers,
  },
  {
    title: 'Built-In Team Collaboration',
    description: 'Keep everyone aligned with role-based access, member views, and real-time communication flows.',
    icon: Users,
  },
  {
    title: 'Integrated Messaging',
    description: 'Chat directly within projects so updates, decisions, and files live where the work happens.',
    icon: MessageSquare,
  },
  {
    title: 'Secure by Default',
    description: 'Protected routes, authentication, and admin controls keep your workspace reliable and safe.',
    icon: ShieldCheck,
  },
];

const workflow = [
  {
    step: '1',
    title: 'Create Workspace',
    description: 'Set up your project in seconds and define your team structure.',
  },
  {
    step: '2',
    title: 'Assign & Track Tasks',
    description: 'Distribute work, set deadlines, and monitor progress from one place.',
  },
  {
    step: '3',
    title: 'Collaborate in Context',
    description: 'Use project-based chat and notifications to stay synced daily.',
  },
  {
    step: '4',
    title: 'Ship with Confidence',
    description: 'Use insights and status reports to close projects on time.',
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="landing-grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <header className="relative z-10 border-b bg-background/70 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500">
              <span className="font-bold text-white">SS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              SynergySphere
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth?mode=login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90">
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto px-4 pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-5 border border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Project Execution, Reimagined
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Build Faster With a Team That Stays
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Perfectly in Sync
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              SynergySphere brings projects, tasks, messages, and team workflows into one focused workspace for faster delivery.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90">
                <Link to="/auth?mode=signup">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/auth?mode=login">I Already Have an Account</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="animate-rise border-blue-200/50 bg-background/80 backdrop-blur">
              <CardContent className="p-5">
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-muted-foreground">Workflow visibility across project stages</p>
              </CardContent>
            </Card>
            <Card className="animate-rise border-teal-200/50 bg-background/80 backdrop-blur [animation-delay:120ms]">
              <CardContent className="p-5">
                <p className="text-3xl font-bold text-teal-600">Real-Time</p>
                <p className="text-sm text-muted-foreground">Collaboration with project-aligned messaging</p>
              </CardContent>
            </Card>
            <Card className="animate-rise border-cyan-200/50 bg-background/80 backdrop-blur [animation-delay:240ms]">
              <CardContent className="p-5">
                <p className="text-3xl font-bold text-cyan-600">Role-Based</p>
                <p className="text-sm text-muted-foreground">Admin and user dashboards for clear ownership</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything Your Team Needs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A complete collaboration platform to plan work, move quickly, and deliver with quality.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="animate-rise border-border/70 bg-background/90 backdrop-blur"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-20">
          <div className="rounded-2xl border bg-card/70 p-6 md:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple Workflow, Powerful Results</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                From planning to execution, every step is designed to keep your team focused and productive.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {workflow.map((item) => (
                <div key={item.step} className="rounded-xl border bg-background/70 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-sm font-semibold text-white">
                      {item.step}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Organize Your Team Better?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-blue-50">
              Launch your workspace, invite your team, and start delivering projects with clarity.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/auth?mode=signup">Create an Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white/60 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                <Link to="/auth?mode=login">
                  Login
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}