import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  AlertCircle, 
  Plus,
  BarChart3,
  Store,
  CreditCard,
  FileText,
  Presentation,
  UserCheck,
  Target,
  Sparkles,
  Download,
  RefreshCw,
  ChevronDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7500 },
];

const expenseData = [
  { month: "Jan", expenses: 2000, profit: 2000 },
  { month: "Feb", expenses: 2500, profit: 500 },
  { month: "Mar", expenses: 3000, profit: 2000 },
  { month: "Apr", expenses: 2800, profit: 1700 },
  { month: "May", expenses: 3500, profit: 2500 },
  { month: "Jun", expenses: 4000, profit: 3500 },
];

const topProducts = [
  { name: "Product A", revenue: 15600 },
  { name: "Product B", revenue: 12400 },
  { name: "Product C", revenue: 8900 },
];

const documentTemplates = [
  {
    id: 'project-proposal',
    title: 'Project Proposal',
    description: 'AI-generated project plan with milestones and goals',
    icon: FileText,
    color: 'text-primary'
  },
  {
    id: 'pitch-deck',
    title: 'Pitch Deck',
    description: '3-5 investor-ready slides using live data',
    icon: Presentation,
    color: 'text-secondary'
  },
  {
    id: 'business-profile',
    title: 'Business Profile',
    description: 'One-pager introducing your brand',
    icon: UserCheck,
    color: 'text-accent'
  },
  {
    id: 'investor-memo',
    title: 'Investor Memo',
    description: 'Market, traction, and funding ask brief',
    icon: Target,
    color: 'text-primary'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Business Dashboard</h1>
            <p className="text-xl text-muted-foreground">Track your progress and performance</p>
          </div>
          <Button onClick={() => navigate("/failsafe")} variant="hero">
            View AI Report
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bizdocs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              BizDocs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$29,900</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">46.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Expenses vs Profit</CardTitle>
              <CardDescription>Monthly financial breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="expenses" fill="hsl(var(--accent))" />
                  <Bar dataKey="profit" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products and Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-primary font-semibold">${product.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your business tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Store className="w-8 h-8 text-green-600" />
                    <span className="font-medium">Shopify</span>
                  </div>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <span className="font-medium">Stripe</span>
                  </div>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sales Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
          </TabsContent>

          <TabsContent value="bizdocs" className="space-y-8">
            {/* BizDocs Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">BizDocs – Your AI Document Partner</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Proposals, decks, and profiles, generated in minutes, not months.
              </p>
            </div>

            {/* Document Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {documentTemplates.map((template) => (
                <Sheet key={template.id}>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-background/50 group-hover:bg-primary/10 transition-colors">
                            <template.icon className={`w-8 h-8 ${template.color} group-hover:scale-110 transition-transform`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-semibold">{template.title}</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button variant="outline" className="w-full group-hover:bg-primary/5">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </Button>
                      </CardContent>
                    </Card>
                  </SheetTrigger>

                  <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-3">
                        <template.icon className={`w-6 h-6 ${template.color}`} />
                        {template.title}
                      </SheetTitle>
                      <SheetDescription>
                        AI-generated document using your business data
                      </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6">
                      {/* Preview Area */}
                      <div className="border rounded-lg p-6 bg-background/50">
                        <h3 className="font-semibold mb-4">Document Preview</h3>
                        <div className="space-y-4 text-sm">
                          {template.id === 'pitch-deck' && (
                            <>
                              <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-medium">Slide 1: Company Overview</h4>
                                <p className="text-muted-foreground">Niyamā - Sustainable professional textiles</p>
                              </div>
                              <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-medium">Slide 2: Market Opportunity</h4>
                                <p className="text-muted-foreground">$47B professional apparel market, growing 8% annually</p>
                              </div>
                              <div className="border-l-4 border-accent pl-4">
                                <h4 className="font-medium">Slide 3: Solution & Traction</h4>
                                <p className="text-muted-foreground">Eco-friendly handcrafted cotton for working professionals</p>
                              </div>
                            </>
                          )}
                          {template.id === 'business-profile' && (
                            <div className="space-y-3">
                              <div><strong>Business Name:</strong> Niyamā</div>
                              <div><strong>Industry:</strong> Textiles & Apparel</div>
                              <div><strong>Mission:</strong> Empowering professionals with sustainable, handcrafted cotton apparel</div>
                              <div><strong>Target Market:</strong> Working professionals seeking comfort and sustainability</div>
                            </div>
                          )}
                          {template.id === 'project-proposal' && (
                            <div className="space-y-3">
                              <div><strong>Project:</strong> Launch Niyamā Professional Collection</div>
                              <div><strong>Timeline:</strong> 6 months</div>
                              <div><strong>Key Milestones:</strong></div>
                              <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Product development & sourcing (Month 1-2)</li>
                                <li>Brand identity & website (Month 2-3)</li>
                                <li>Marketing campaign launch (Month 4)</li>
                                <li>Sales & distribution (Month 5-6)</li>
                              </ul>
                            </div>
                          )}
                          {template.id === 'investor-memo' && (
                            <div className="space-y-3">
                              <div><strong>Investment Ask:</strong> $250K Series Seed</div>
                              <div><strong>Market Size:</strong> $47B (TAM), $8.2B (SAM)</div>
                              <div><strong>Traction:</strong> Pre-orders from 50+ professionals</div>
                              <div><strong>Use of Funds:</strong> Inventory (60%), Marketing (25%), Operations (15%)</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AI Insight */}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm">
                              <strong>📌 AI Insight:</strong> Based on your Failsafe metrics, we emphasized customer traction in this document. 
                              Want us to pivot toward funding ask instead?
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4" />
                          Regenerate
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Export Options */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Export Options</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            PPT
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Google Docs
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;