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
import SupportHub from "./pages/SupportHub";
import GeneralEnquiry from "./pages/GeneralEnquiry";
import ComplaintAppeal from "./pages/ComplaintAppeal";
import WellbeingSafety from "./pages/WellbeingSafety";
import AnonymousReport from "./pages/AnonymousReport";
import ProtectedDisclosure from "./pages/ProtectedDisclosure";
import TrackRequest from "./pages/TrackRequest";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import MyEnquiries from "./pages/dashboard/MyEnquiries";
import EnquiryDetail from "./pages/dashboard/EnquiryDetail";
import MyCases from "./pages/dashboard/MyCases";
import CaseDetail from "./pages/dashboard/CaseDetail";
import DashboardInbox from "./pages/dashboard/DashboardInbox";
import DashboardUpdates from "./pages/dashboard/DashboardUpdates";
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
              <Route path="/support" element={<SupportHub />} />
              <Route path="/support/complaint" element={<ComplaintAppeal />} />
              <Route path="/support/wellbeing" element={<WellbeingSafety />} />
              <Route path="/support/report" element={<AnonymousReport />} />
              <Route path="/support/disclosure" element={<ProtectedDisclosure />} />
              <Route path="/enquire" element={<GeneralEnquiry />} />
              <Route path="/track" element={<TrackRequest />} />
            </Route>

            {/* Student dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="enquiries" element={<MyEnquiries />} />
              <Route path="enquiries/:id" element={<EnquiryDetail />} />
              <Route path="cases" element={<MyCases />} />
              <Route path="cases/:id" element={<CaseDetail />} />
              <Route path="inbox" element={<DashboardInbox />} />
              <Route path="updates" element={<DashboardUpdates />} />
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
