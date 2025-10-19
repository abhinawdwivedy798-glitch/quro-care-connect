export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  lastVisit: string;
  insurance: {
    verified: boolean;
    provider: string;
    policyNumber: string;
    coverage: string;
  };
  medicalHistory: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  time: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  type: "checkup" | "follow-up" | "emergency";
}

export interface QueueItem {
  id: string;
  tokenNumber: number;
  patientName: string;
  doctorName: string;
  estimatedTime: string;
  status: "waiting" | "in-consultation" | "completed";
}

export interface InsuranceClaim {
  id: string;
  patientName: string;
  claimAmount: number;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  provider: string;
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 45,
    phone: "+91 98765 43210",
    email: "rajesh.k@email.com",
    lastVisit: "2025-01-15",
    insurance: {
      verified: true,
      provider: "Star Health",
      policyNumber: "SH123456789",
      coverage: "₹5,00,000"
    },
    medicalHistory: ["Diabetes Type 2", "Hypertension"]
  },
  {
    id: "P002",
    name: "Priya Sharma",
    age: 32,
    phone: "+91 98765 43211",
    email: "priya.s@email.com",
    lastVisit: "2025-01-18",
    insurance: {
      verified: true,
      provider: "HDFC Ergo",
      policyNumber: "HE987654321",
      coverage: "₹3,00,000"
    },
    medicalHistory: ["Asthma"]
  },
  {
    id: "P003",
    name: "Amit Patel",
    age: 58,
    phone: "+91 98765 43212",
    email: "amit.p@email.com",
    lastVisit: "2025-01-10",
    insurance: {
      verified: false,
      provider: "Not Enrolled",
      policyNumber: "-",
      coverage: "-"
    },
    medicalHistory: ["Arthritis", "High Cholesterol"]
  },
  {
    id: "P004",
    name: "Sneha Reddy",
    age: 28,
    phone: "+91 98765 43213",
    email: "sneha.r@email.com",
    lastVisit: "2025-01-19",
    insurance: {
      verified: true,
      provider: "Max Bupa",
      policyNumber: "MB456789123",
      coverage: "₹2,00,000"
    },
    medicalHistory: []
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Suresh Menon",
    time: "10:00 AM",
    date: "2025-01-20",
    status: "scheduled",
    type: "follow-up"
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Priya Sharma",
    doctorName: "Dr. Anjali Desai",
    time: "11:30 AM",
    date: "2025-01-20",
    status: "in-progress",
    type: "checkup"
  },
  {
    id: "A003",
    patientId: "P004",
    patientName: "Sneha Reddy",
    doctorName: "Dr. Suresh Menon",
    time: "02:00 PM",
    date: "2025-01-20",
    status: "scheduled",
    type: "checkup"
  }
];

export const mockQueue: QueueItem[] = [
  {
    id: "Q001",
    tokenNumber: 12,
    patientName: "Priya Sharma",
    doctorName: "Dr. Anjali Desai",
    estimatedTime: "5 mins",
    status: "in-consultation"
  },
  {
    id: "Q002",
    tokenNumber: 13,
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Suresh Menon",
    estimatedTime: "12 mins",
    status: "waiting"
  },
  {
    id: "Q003",
    tokenNumber: 14,
    patientName: "Amit Verma",
    doctorName: "Dr. Anjali Desai",
    estimatedTime: "25 mins",
    status: "waiting"
  }
];

export const mockClaims: InsuranceClaim[] = [
  {
    id: "C001",
    patientName: "Rajesh Kumar",
    claimAmount: 12500,
    status: "approved",
    submittedDate: "2025-01-15",
    provider: "Star Health"
  },
  {
    id: "C002",
    patientName: "Priya Sharma",
    claimAmount: 8500,
    status: "pending",
    submittedDate: "2025-01-18",
    provider: "HDFC Ergo"
  },
  {
    id: "C003",
    patientName: "Sneha Reddy",
    claimAmount: 5200,
    status: "approved",
    submittedDate: "2025-01-16",
    provider: "Max Bupa"
  }
];
