import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button } from "@/components/micro";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Upload,
  MessageCircle,
  Download,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PaymentDetail {
  id: string;
  recipientName: string;
  recipientType: "influencer" | "agency";
  recipientHandle?: string;
  amount: number;
  status: "completed" | "pending" | "processing" | "failed";
  date: string;
  dueDate?: string;
  campaignName: string;
  method: string;
  transactionId?: string;
  description: string;
  conversationId?: string;
}

interface FlowStage {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  date?: string;
  action?: string;
}

const mockPaymentDetail: PaymentDetail = {
  id: "PAY001",
  recipientName: "Alex Johnson (@alexjohnson)",
  recipientType: "influencer",
  recipientHandle: "alexjohnson",
  amount: 2500,
  status: "completed",
  date: "2024-01-15",
  campaignName: "Summer Collection 2024",
  method: "Bank Transfer",
  transactionId: "TXN-2024-001",
  description: "Content delivery & promotion",
  conversationId: "3",
};

const mockFlowStages: FlowStage[] = [
  {
    id: "1",
    title: "Payment Link Generated",
    description: "Payment link was created and sent to the influencer",
    status: "completed",
    date: "2024-01-10",
    action: "Link generated",
  },
  {
    id: "2",
    title: "Payment Link Status",
    description: "Payment link is active and ready for use",
    status: "completed",
    date: "2024-01-10",
    action: "Link active",
  },
  {
    id: "3",
    title: "Payment Initiated",
    description: "Influencer initiated the payment",
    status: "completed",
    date: "2024-01-14",
    action: "Payment started",
  },
  {
    id: "4",
    title: "Proof Shared",
    description: "Proof of delivery/completion uploaded",
    status: "completed",
    date: "2024-01-14",
    action: "Screenshot uploaded",
  },
  {
    id: "5",
    title: "Influencer Confirmed",
    description: "Influencer confirmed payment receipt",
    status: "completed",
    date: "2024-01-15",
    action: "Confirmed",
  },
];

const mockProofFiles = [
  {
    id: "1",
    name: "content_delivery_proof.jpg",
    uploadedBy: "Alex Johnson",
    uploadedAt: "2024-01-14",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "payment_receipt.pdf",
    uploadedBy: "Alex Johnson",
    uploadedAt: "2024-01-14",
    size: "850 KB",
  },
];

export default function BrandPaymentDetails() {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(mockProofFiles);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const newFile = {
        id: String(uploadedFiles.length + 1),
        name: file.name,
        uploadedBy: "You",
        uploadedAt: new Date().toISOString().split("T")[0],
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setShowUploadModal(false);
    }
  };

  const handleMessageClick = () => {
    navigate("/brand/messages");
  };

  const getStageIcon = (status: FlowStage["status"]) => {
    if (status === "completed") {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    } else if (status === "current") {
      return <Clock className="w-6 h-6 text-blue-600" />;
    } else {
      return (
        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            {/* Header with Back Button */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/brand/payments")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Payment Details
                  </h1>
                  <p className="text-foreground/60 mt-1">
                    {mockPaymentDetail.id} • {mockPaymentDetail.campaignName}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleMessageClick}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
            </div>

            {/* Payment Status and Amount */}
            <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Amount</p>
                    <p className="text-4xl font-bold text-foreground mb-4">
                      ${mockPaymentDetail.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                        {mockPaymentDetail.status}
                      </span>
                      <span className="text-sm text-foreground/60">
                        via {mockPaymentDetail.method}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground/60 text-sm mb-1">Transaction ID</p>
                    <p className="font-mono text-lg font-semibold text-foreground">
                      {mockPaymentDetail.transactionId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Flow Tracker */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Payment Journey
                </h2>
                <div className="space-y-4">
                  {mockFlowStages.map((stage, idx) => (
                    <div key={stage.id}>
                      <div className="flex gap-4">
                        {/* Timeline Line and Icon */}
                        <div className="flex flex-col items-center">
                          {getStageIcon(stage.status)}
                          {idx < mockFlowStages.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 mt-2" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="pb-4 flex-grow">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-foreground">
                              {stage.title}
                            </h3>
                            {stage.date && (
                              <span className="text-sm text-foreground/60">
                                {new Date(stage.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground/70 mb-2">
                            {stage.description}
                          </p>
                          {stage.action && (
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {stage.action}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Proof of Delivery Section */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Proof of Delivery
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Proof
                  </Button>
                </div>

                {uploadedFiles.length > 0 ? (
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-grow">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-foreground">
                              {file.name}
                            </p>
                            <p className="text-xs text-foreground/60">
                              Uploaded by {file.uploadedBy} on{" "}
                              {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground/60">
                            {file.size}
                          </p>
                          <button className="text-primary hover:text-primary/80 transition-colors mt-1">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                    <FileText className="w-8 h-8 text-foreground/40 mx-auto mb-2" />
                    <p className="text-foreground/60 text-sm">
                      No proof documents uploaded yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Recipient Details */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-foreground mb-4">
                    Recipient Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground/60">Name</p>
                      <p className="font-medium text-foreground">
                        {mockPaymentDetail.recipientName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Type</p>
                      <p className="font-medium text-foreground capitalize">
                        {mockPaymentDetail.recipientType}
                      </p>
                    </div>
                    {mockPaymentDetail.recipientHandle && (
                      <div>
                        <p className="text-sm text-foreground/60">Handle</p>
                        <p className="font-medium text-foreground">
                          @{mockPaymentDetail.recipientHandle}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Campaign & Payment Info */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-foreground mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground/60">Campaign</p>
                      <p className="font-medium text-foreground">
                        {mockPaymentDetail.campaignName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Payment Method</p>
                      <p className="font-medium text-foreground">
                        {mockPaymentDetail.method}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Payment Date</p>
                      <p className="font-medium text-foreground">
                        {new Date(mockPaymentDetail.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-3">Description</h3>
                <p className="text-foreground/70">
                  {mockPaymentDetail.description}
                </p>
              </CardContent>
            </Card>
          </Container>
        </main>
      </div>

      {/* Upload Proof Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">
                  Upload Proof Document
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/60" />
                </button>
              </div>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/20 hover:border-primary/50"
                )}
              >
                <Upload className="w-8 h-8 mx-auto mb-3 text-foreground/60" />
                <p className="font-medium text-foreground mb-1">
                  Drag and drop your file
                </p>
                <p className="text-sm text-foreground/60 mb-3">
                  or click to browse
                </p>
                <p className="text-xs text-foreground/50">
                  Supported formats: JPG, PNG, PDF (Max 10MB)
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </Button>
                <Button fullWidth>Upload</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
