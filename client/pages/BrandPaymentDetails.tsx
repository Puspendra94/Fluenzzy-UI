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
    title: "Payment Created",
    description: "You initiated a payment for this collaboration",
    status: "completed",
    date: "2024-01-10",
  },
  {
    id: "2",
    title: "Link Sent",
    description: "Payment link sent to the recipient",
    status: "completed",
    date: "2024-01-10",
  },
  {
    id: "3",
    title: "Payment Received",
    description: "Recipient confirmed receipt of payment",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "4",
    title: "Proof Verified",
    description: "Proof of service delivery uploaded and verified",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "5",
    title: "Completed",
    description: "Payment transaction completed successfully",
    status: "completed",
    date: "2024-01-15",
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
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    } else if (status === "current") {
      return <Clock className="w-5 h-5 text-blue-600" />;
    } else {
      return (
        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
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

            {/* Payment Journey - Horizontal Timeline */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Payment Journey
                </h2>
                <div className="overflow-x-auto">
                  <div className="flex gap-6 min-w-max pb-4">
                    {mockFlowStages.map((stage, idx) => (
                      <div key={stage.id} className="flex flex-col items-center min-w-[180px]">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-3">
                          {getStageIcon(stage.status)}
                        </div>

                        {/* Connector Line */}
                        {idx < mockFlowStages.length - 1 && (
                          <div className="absolute left-[calc(50%+20px)] top-[52px] w-[120px] h-0.5 bg-gray-300" />
                        )}

                        {/* Content */}
                        <div className="text-center">
                          <h3 className="font-semibold text-foreground text-sm mb-1">
                            {stage.title}
                          </h3>
                          <p className="text-xs text-foreground/60 mb-2 max-w-[160px]">
                            {stage.description}
                          </p>
                          {stage.date && (
                            <span className="text-xs text-foreground/50">
                              {new Date(stage.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details and Proof Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Details Card */}
              <Card className="lg:col-span-2">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Amount Section */}
                    <div className="pb-6 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2">Amount</p>
                      <p className="text-4xl font-bold text-foreground">
                        ${mockPaymentDetail.amount.toLocaleString()}
                      </p>
                    </div>

                    {/* Status and Method */}
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border">
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">Status</p>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium capitalize inline-block",
                            mockPaymentDetail.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : mockPaymentDetail.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : mockPaymentDetail.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {mockPaymentDetail.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">Method</p>
                        <p className="font-medium text-foreground">
                          {mockPaymentDetail.method}
                        </p>
                      </div>
                    </div>

                    {/* IDs */}
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border">
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">Transaction ID</p>
                        <p className="font-mono text-sm font-semibold text-foreground break-all">
                          {mockPaymentDetail.transactionId || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">Payment ID</p>
                        <p className="font-mono text-sm font-semibold text-foreground">
                          {mockPaymentDetail.id}
                        </p>
                      </div>
                    </div>

                    {/* Recipient Details */}
                    <div className="pb-6 border-b border-border">
                      <h3 className="font-semibold text-foreground mb-3">
                        Recipient Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Name</p>
                          <p className="font-medium text-foreground">
                            {mockPaymentDetail.recipientName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Type</p>
                          <p className="font-medium text-foreground capitalize">
                            {mockPaymentDetail.recipientType}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="pb-6 border-b border-border">
                      <h3 className="font-semibold text-foreground mb-3">
                        Payment Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Campaign</p>
                          <p className="font-medium text-foreground">
                            {mockPaymentDetail.campaignName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Payment Date</p>
                          <p className="font-medium text-foreground">
                            {new Date(mockPaymentDetail.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {mockPaymentDetail.dueDate && (
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Due Date</p>
                          <p className="font-medium text-foreground">
                            {new Date(mockPaymentDetail.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Description
                      </h3>
                      <p className="text-foreground/70">
                        {mockPaymentDetail.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Proof of Delivery Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">
                      Proof of Delivery
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowUploadModal(true)}
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  </div>

                  {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-grow min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-foreground/60">
                                {file.size}
                              </p>
                            </div>
                            <button className="text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-foreground/50">
                            {file.uploadedBy} • {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
                      <FileText className="w-6 h-6 text-foreground/40 mx-auto mb-2" />
                      <p className="text-xs text-foreground/60">
                        No proof uploaded
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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
