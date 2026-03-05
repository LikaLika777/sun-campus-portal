import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoProvider } from "@/contexts/DemoContext";
import { DemoToggle } from "@/components/DemoToggle";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { StaffLayout } from "@/components/layouts/StaffLayout";
import Index from "./pages/Index";
import CourseCatalogue from "./pages/CourseCatalogue";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DemoProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<CourseCatalogue />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Student dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<div className="text-muted-foreground text-center py-20">Dashboard coming soon</div>} />
            </Route>

            {/* Staff routes */}
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<div className="text-muted-foreground text-center py-20">Staff portal coming soon</div>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <DemoToggle />
      </DemoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
