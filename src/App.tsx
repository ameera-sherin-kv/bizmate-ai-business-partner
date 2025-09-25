import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import IndustrySelection from "./pages/IndustrySelection";
import Discovery from "./pages/Discovery";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import BizDocs from "./pages/BizDocs";
import FailSafe from "./pages/FailSafe";
import Scaling from "./pages/Scaling";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/industry" element={<IndustrySelection />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bizdocs" element={<BizDocs />} />
          <Route path="/failsafe" element={<FailSafe />} />
          <Route path="/scaling" element={<Scaling />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
