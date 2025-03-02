import { Button } from '@/components/ui/button';
import { Sparkles, AlertCircle } from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DocsContext } from '@/contexts/DocsContext';

const Alerts = () => {
    const { docs } = useContext(DocsContext);

    // ✅ Filter documents with fraud alerts
    const fraudDocs = docs.filter(doc => doc.fraud_alerts && doc.fraud_alerts.length > 0);

    return (
        <main className='w-full min-h-screen p-10'>
            <section className="mb-6 flex items-center justify-between w-full">
                <h2 className="font-semibold text-2xl text-gray-800">
                    Fraud Alerts Detected
                </h2>
                <Link to={'/ai-search'}>
                    <Button>
                        <Sparkles />
                        Ask AI
                    </Button>
                </Link>
            </section>

            {fraudDocs.length > 0 ? (
                <section className="mt-6">
                    <h3 className="text-lg font-semibold text-red-600">🚨 Detected Fraud Cases</h3>
                    <ul className="mt-4 space-y-4">
                        {fraudDocs.map((doc, idx) => (
                            <li key={idx} className="p-4 bg-red-50 border border-red-300 rounded-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-800 font-semibold">{doc.name}</p>
                                        <p className="text-gray-600 text-sm">{doc.type}</p>
                                    </div>
                                    <Link 
                                        to={doc.file_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Document
                                    </Link>
                                </div>

                                {/* Fraud Alerts */}
                                <div className="mt-2 p-2 bg-red-100 rounded-md text-sm text-gray-700">
                                    <AlertCircle className="inline-block w-5 h-5 text-red-600 mr-2" />
                                    <strong>Alerts:</strong> {doc.fraud_alerts.join(", ")}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                <p className="text-gray-500 mt-6">No fraud alerts detected.</p>
            )}
        </main>
    );
};

export default Alerts;
