import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const defectService = {
  generateDefectRef: async (projectId: string): Promise<string> => {
    const projectDoc = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectDoc);
    
    if (!projectSnap.exists()) {
      throw new Error('Project not found');
    }

    const counterDoc = doc(collection(db, 'defect_counters'), projectId);
    const counterSnap = await getDoc(counterDoc);
    
    let counter = 1;
    if (counterSnap.exists()) {
      counter = counterSnap.data().count + 1;
    }
    
    await setDoc(counterDoc, { count: counter });
    
    // Format: PRJ-2023-001
    const year = new Date().getFullYear();
    const paddedCounter = String(counter).padStart(3, '0');
    return `${projectId}-${year}-${paddedCounter}`;
  },

  saveDefect: async (defectData: any) => {
    const defectRef = await defectService.generateDefectRef(defectData.projectId);
    const defectDoc = doc(collection(db, 'defects'), defectRef);
    
    await setDoc(defectDoc, {
      ...defectData,
      createdAt: new Date().toISOString(),
      status: 'open'
    });

    return defectRef;
  }
};