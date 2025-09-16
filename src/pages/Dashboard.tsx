import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateDocument = (template: any) => {
    setSelectedTemplate(template);
    setIsGenerating(true);
    
    // Simulate AI generation for 1-3 seconds
    const loadingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    setTimeout(() => {
      setIsGenerating(false);
      setIsDialogOpen(true);
    }, loadingTime);
  };

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
                <Card key={template.id} className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
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
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary/5"
                      onClick={() => handleGenerateDocument(template)}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading Dialog */}
            {isGenerating && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="w-96 p-8 text-center shadow-glow">
                  <div className="mb-6">
                    <RefreshCw className="w-12 h-12 mx-auto text-primary animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Generating Your Document</h3>
                  <p className="text-muted-foreground mb-4">Our AI is crafting your {selectedTemplate?.title.toLowerCase()}...</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </Card>
              </div>
            )}

            {/* Document Content Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-[90vw] max-h-[90vh] w-[90vw] h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    {selectedTemplate && (
                      <>
                        <selectedTemplate.icon className={`w-8 h-8 ${selectedTemplate.color}`} />
                        {selectedTemplate.title}
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-lg">
                    AI-generated document using your business data
                  </DialogDescription>
                </DialogHeader>

                    <div className="mt-6 space-y-6">
                      {/* Preview Area */}
                      <div className="border rounded-lg p-6 bg-background/50">
                        <h3 className="font-semibold mb-4">Document Preview</h3>
                        <div className="space-y-4 text-sm">
                           {template.id === 'pitch-deck' && (
                            <>
                              <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-medium">Slide 1: Problem + Solution</h4>
                                <p className="text-muted-foreground">Problem: Eco-conscious consumers lack affordable, stylish textile options. Solution: WeaveNest offers everyday sustainable clothing & home fabrics at accessible prices.</p>
                              </div>
                              <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-medium">Slide 2: Market Opportunity</h4>
                                <p className="text-muted-foreground">Growing sustainable fashion demand (20% YoY). Urban middle-class & Gen Z eco-shift = ₹3,500 Cr market in India.</p>
                              </div>
                              <div className="border-l-4 border-accent pl-4">
                                <h4 className="font-medium">Slide 3: Traction + Model</h4>
                                <p className="text-muted-foreground">Products: Shirts, sarees, bedsheets. Pricing: ₹1200–₹3500. Early interest: 100+ signups on waitlist.</p>
                              </div>
                              <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-medium">Slide 4: Funding Ask</h4>
                                <p className="text-muted-foreground">Asking: ₹50 lakhs for 15% equity. Goal: Scale to ₹50 lakhs in revenue by Year 2.</p>
                              </div>
                            </>
                          )}
                          {template.id === 'business-profile' && (
                            <div className="space-y-3">
                              <div><strong>Business Name:</strong> WeaveNest</div>
                              <div><strong>Industry:</strong> Sustainable Textiles</div>
                              <div><strong>Founded By:</strong> Asha Verma & Rahul Sen</div>
                              <div><strong>Vision:</strong> To redefine affordable fashion with eco-friendly fabrics</div>
                              <div><strong>Mission:</strong> Deliver sustainable style and everyday comfort to urban households</div>
                              <div><strong>Products:</strong> Organic cotton shirts, Linen sarees, Bamboo-fiber bedsheets</div>
                              <div><strong>Target Audience:</strong> Eco-conscious millennials & Gen Z (urban, middle-income)</div>
                              <div><strong>Business Model:</strong> Direct-to-Consumer (online) + Wholesale (eco-boutiques)</div>
                            </div>
                          )}
                          {template.id === 'project-proposal' && (
                            <div className="space-y-3">
                              <div><strong>Title:</strong> WeaveNest: Affordable Sustainable Textiles</div>
                              <div><strong>Tagline:</strong> Sustainable Style, Everyday Comfort</div>
                              <div><strong>Objectives:</strong></div>
                              <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Launch eco-friendly apparel and home textiles online within 6 months</li>
                                <li>Achieve 2,500 customers in Year 1</li>
                                <li>Generate ₹50 lakhs in revenue by Year 2</li>
                              </ul>
                              <div><strong>Approach:</strong></div>
                              <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Set up Shopify store with fulfillment via ShipRocket</li>
                                <li>Leverage influencer marketing and sustainability storytelling</li>
                                <li>Build partnerships with boutique eco-brands for B2B sales</li>
                              </ul>
                            </div>
                          )}
                          {template.id === 'investor-memo' && (
                            <div className="space-y-3">
                              <div><strong>Overview:</strong> WeaveNest is a D2C textile startup bringing affordable sustainable fabrics to Indian consumers.</div>
                              <div><strong>Problem:</strong> Current eco-fashion players price products too high for middle-income households</div>
                              <div><strong>Solution:</strong> WeaveNest offers organic cotton, linen, and bamboo-fiber textiles at affordable pricing (₹1200–₹3500)</div>
                              <div><strong>Market:</strong> TAM: ₹3,500 Cr (India) with 20% YoY growth. SAM: ₹400 Cr affordable sustainable apparel/home textiles</div>
                              <div><strong>Traction:</strong> Pre-launch waitlist: 100+ customers. Artisan partnerships secured in Rajasthan & Bengal</div>
                              <div><strong>Funding Ask:</strong> ₹50 lakhs for 15% equity. Use of funds: 50% inventory, 30% marketing, 20% ops/tech</div>
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
                              <strong>📌 AI Insight:</strong> Based on your WeaveNest business data, we emphasized eco-friendly positioning and artisan partnerships. 
                              Want us to focus more on financial projections instead?
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