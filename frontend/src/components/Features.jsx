import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Activity, 
  ArrowRightLeft,
  FileSpreadsheet,
  Download,
  Upload,
  Zap,
  RefreshCw,
  CheckCircle,
  ShieldCheck,
  MoveRight,
} from 'lucide-react';

const mainFeatures = [
  {
    title: "Excel & CSV to Charts",
    description: "Transform your spreadsheet data into stunning visualizations",
    icon: BarChart3,
    icon2: MoveRight,
    gradient: "from-chart-1 to-chart-2",
    features: [
      "15+ Chart Types Available",
      "Bar, Line, Pie, Area & More",
      "Professional Quality Output",
      "PNG & JPG Export"
    ],
    badge: "Main Feature"
  },
  {
    title: "File Format Conversion", 
    description: "Seamlessly convert between Excel and CSV formats",
    icon: ArrowRightLeft,
    icon2: MoveRight,
    gradient: "from-blue-500 to-purple-500",
    features: [
      "XLS ↔ CSV Conversion",
      "XLSX ↔ CSV Conversion", 
      "Batch Processing",
      "Data Integrity Preserved"
    ],
    badge: "Essential Tool"
  }
];

const chartTypes = [
  { name: 'Bar Chart', icon: BarChart3, color: 'text-chart-1' },
  { name: 'Line Chart', icon: LineChart, color: 'text-chart-2' },
  { name: 'Pie Chart', icon: PieChart, color: 'text-chart-3' },
  { name: 'Area Chart', icon: TrendingUp, color: 'text-chart-4' },
  { name: 'Scatter Plot', icon: Activity, color: 'text-chart-5' },
];

const capabilities = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Generate charts and convert files in seconds",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Upload,
    title: "Easy File Upload",
    description: "Drag & drop or click to upload your files",
    color: "from-green-400 to-green-600"
  },
  {
    icon: RefreshCw,
    title: "Batch Operations",
    description: "Process multiple files at once",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Download,
    title: "High-Quality Export",
    description: "Download in multiple formats instantly",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    description: "100% secure processing with no data storage",
    color: "from-emerald-400 to-emerald-600"
  },
  {
    icon: FileSpreadsheet,
    title: "Format Preservation",
    description: "Maintain data integrity during conversion",
    color: "from-indigo-400 to-indigo-600"
  }
];

export function Features() {
  const navigate = useNavigate();

  const handleGraph = () => {
    navigate("/excel-to-graph");
  };
  const handleConvert = () => {
    navigate("/excel-to-csv");
  }
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background/95 via-accent/10 to-background/95 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Powerful Data Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade tools for transforming your data into actionable insights and converting between formats seamlessly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <Card className="flex flex-col h-full border-2 hover:shadow-lg transition-all duration-300 group backdrop-blur-sm bg-card/80 hover:bg-card/90">
                <CardContent className="flex flex-col p-8 flex-grow">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="">
                      <Badge className={`mb-3 bg-gradient-to-r ${feature.gradient} text-white shadow-sm`}>
                        {feature.badge}
                      </Badge>
                      <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </div>
                    {feature.badge === "Essential Tool" ? (
                      <div onClick={handleConvert} className='rounded-full bg-gradient-to-br from-chart-6 to-chart-5 p-2 shadow-lg flex items-center justify-center hover:cursor-pointer'>
                        <feature.icon2 className="h-6 w-6 ml-auto" />
                      </div>
                    ) : (
                      <div onClick={handleGraph} className='rounded-full bg-gradient-to-br from-chart-5 to-chart-1 p-2 shadow-lg flex items-center justify-center hover:cursor-pointer'>
                        <feature.icon2 className="h-6 w-6 ml-auto" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 mt-auto">
                    {feature.features.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (itemIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold mb-4">Supported Chart Types</h3>
          <p className="text-muted-foreground text-lg">Choose from a comprehensive library of visualization options</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {chartTypes.map((chart, index) => (
            <motion.div
              key={chart.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <Card className="flex flex-col text-center p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer backdrop-blur-sm bg-card/70 hover:bg-card/90 border hover:border-chart-1/30 flex-grow">
                <div className="mb-4">
                  <chart.icon className={`h-8 w-8 mx-auto ${chart.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <p className="font-medium">{chart.name}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold mb-4">Why Choose GraphCraft</h3>
          <p className="text-muted-foreground text-lg">Built for professionals who demand quality and efficiency</p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <Card className="flex flex-col text-center p-6 hover:shadow-lg transition-all duration-300 group backdrop-blur-sm bg-card/70 hover:bg-card/90 flex-grow">
                <div className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <capability.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{capability.title}</h4>
                <p className="text-muted-foreground">{capability.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}