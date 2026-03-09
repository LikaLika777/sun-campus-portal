import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { courses } from "@/mocks/courses";
import { simulateLatency } from "@/mocks/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, MapPin, CalendarDays, DollarSign, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    simulateLatency().then(() => setLoading(false));
  }, [slug]);

  const course = courses.find((c) => c.slug === slug);

  if (!loading && !course) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-2">Course not found</h1>
        <p className="text-muted-foreground mb-4">The program you're looking for doesn't exist.</p>
        <Link to="/courses"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Button></Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="bg-slate-80000 py-12"><div className="container"><Skeleton className="h-8 w-64 bg-primary-foreground/20" /><Skeleton className="h-5 w-96 mt-3 bg-primary-foreground/10" /></div></div>
        <div className="container py-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-40 w-full" /></div>
          <div><Skeleton className="h-64 w-full" /></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bslate-800ry text-primary-foreground py-10">
        <div className="container">
          <Link to="/courses" className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> All Programs
          </Link>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-accent text-accent-foreground border-0 mb-3">{course!.category}</Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-2">{course!.title}</h1>
            <p className="text-primary-foreground/80 max-w-2xl">{course!.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Entry Requirements</TabsTrigger>
              <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-lg font-semibold mb-3">Program Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{course!.overview}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-lg font-semibold mb-3">Entry Requirements</h2>
                  <ul className="space-y-2">
                    {course!.entryRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="study-plan">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-lg font-semibold mb-3">Study Plan</h2>
                  <ul className="space-y-3">
                    {course!.studyPlan.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-heading text-sm font-semibold">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <div><span className="font-medium text-foreground">Duration:</span> {course!.duration}</div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div><span className="font-medium text-foreground">Intake:</span> {course!.intake}</div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div><span className="font-medium text-foreground">Campus:</span> {course!.campus}</div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div><span className="font-medium text-foreground">Fees:</span> {course!.fees}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Link to="/enquire" className="block">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Enquire Now
              </Button>
            </Link>
            <Link to="/register" className="block">
              <Button variant="outline" className="w-full">
                Apply Now
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
