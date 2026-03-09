import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/mocks/courses";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, HeadphonesIcon, ArrowRight, Globe, Users, Award } from "lucide-react";

const features = [
  { icon: Globe, title: "Global Pathways", description: "Study pathways to UNSW Sydney, a world top-20 university." },
  { icon: Users, title: "Student Support", description: "Dedicated support services for your academic journey." },
  { icon: Award, title: "Proven Success", description: "Over 50 years preparing students for university success." },
];

const stats = [
  { value: "125,000+", label: "graduates in Foundation and Diploma" },
  { value: "1st", label: "in Australia to deliver pathway programs" },
  { value: "50+", label: "years preparing students for university" },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Index() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <div>
      {/* Hero — photo-based like the real UNSW College site */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0">
          <img
            src="/images/hero-campus.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
        </div>
        <div className="container relative py-20 sm:py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl">
            <h1 id="hero-heading" className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Your path to<br />UNSW Sydney
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 font-body">
              Start your university journey with UNSW College and prepare to transition to a world top-20 university, UNSW Sydney.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/courses">
                <Button size="lg" className="font-semibold hover-lift">
                  Find your pathway <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/enquire">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/5 font-semibold">
                  Make an Enquiry
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 md:py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Why UNSW College</h2>
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Card className="border shadow-card hover-lift">
                <CardContent className="p-5 sm:p-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm sm:text-base font-semibold mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats — matching the real site's key numbers */}
      <section className="bg-accent text-accent-foreground py-12 md:py-14" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Key statistics</h2>
        <div className="container">
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 sm:grid-cols-3 text-center">
            {stats.map((s) => (
              <motion.div key={s.value} variants={item}>
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-accent-foreground mb-1">{s.value}</div>
                <p className="text-sm text-accent-foreground/80">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12 md:py-16" aria-labelledby="programs-heading">
        <div className="container">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 id="programs-heading" className="font-heading text-xl sm:text-2xl font-bold">Study with us</h2>
              <p className="text-muted-foreground text-sm mt-1">Find the right pathway for your goals.</p>
            </div>
            <Link to="/courses" className="text-sm font-medium text-accent hover:underline flex items-center gap-1 story-link">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <Link to={`/courses/${course.slug}`}>
                  <Card className="h-full hover-lift cursor-pointer group border">
                    <CardContent className="p-4 sm:p-5">
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground bg-primary mb-3">
                        {course.category}
                      </span>
                      <h3 className="font-heading text-sm sm:text-base font-semibold mb-1 group-hover:text-accent transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>{course.duration}</span>
                        <span>·</span>
                        <span>{course.campus}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Banner — yellow bg like the real site's CTAs */}
      <section className="bg-primary py-10 sm:py-12" aria-labelledby="support-heading">
        <div className="container text-center">
          <HeadphonesIcon className="mx-auto h-8 w-8 text-primary-foreground mb-3" />
          <h2 id="support-heading" className="font-heading text-lg sm:text-xl font-bold text-primary-foreground mb-2">Need help? We're here for you.</h2>
          <p className="text-sm text-primary-foreground/80 mb-4 max-w-md mx-auto">
            Whether it's about courses, fees, wellbeing, or anything else — our support team is ready to assist.
          </p>
          <Link to="/support">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 hover-lift font-semibold">
              Visit Support Hub <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
