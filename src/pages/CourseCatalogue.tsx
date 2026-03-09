import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courses, type Course } from "@/mocks/courses";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { simulateLatency } from "@/mocks/utils";

const categories = ["All", "Foundation", "Diploma", "Transition", "English"] as const;

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function CourseCatalogue() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    setLoading(true);
    simulateLatency().then(() => {
      setData(courses);
      setLoading(false);
    });
  }, []);

  const filtered = data.filter((c) => {
    const matchesCategory = activeFilter === "All" || c.category === activeFilter;
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="text-primary-foreground py-12 bg-slate-800">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-2">Our Programs</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Explore Foundation, Diploma, Transition and English programs — your pathway to UNSW Sydney.
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === cat ?
              "bg-primary text-primary-foreground border-primary" :
              "bg-card text-muted-foreground border-border hover:border-primary/40"}`
              }>
              
                {cat}
              </button>
            )}
          </div>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search programs" />
            
          </div>
        </div>

        {/* Grid */}
        {loading ?
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) =>
          <Card key={i}>
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
          )}
          </div> :
        filtered.length === 0 ?
        <div className="text-center py-16">
            <p className="text-muted-foreground">No programs match your filters.</p>
          </div> :

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          key={activeFilter + search}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
            {filtered.map((course) =>
          <motion.div key={course.id} variants={item}>
                <Link to={`/courses/${course.slug}`}>
                  <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0 text-[11px]">
                        {course.category}
                      </Badge>
                      <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex gap-3">
                          <span>{course.duration}</span>
                          <span>·</span>
                          <span>{course.campus}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
          )}
          </motion.div>
        }
      </div>
    </div>);

}