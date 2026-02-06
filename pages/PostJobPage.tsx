import * as React from 'react';
import type { Job } from '../types';
import JobForm from '../components/JobForm';
import PdfIcon from '../components/icons/PdfIcon';
import WhatsappIcon from '../components/icons/WhatsappIcon';
import EmailIcon from '../components/icons/EmailIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const SubmissionSuccess: React.FC<{ job: Job; onPostAnother: () => void }> = ({ job, onPostAnother }) => {
  const generatePdf = () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Fiche de Poste", 105, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.text(job.title, 105, 30, { align: 'center' });

    (doc as any).autoTable({
        startY: 40,
        head: [['Detail', 'Information']],
        body: [
            ['Category', job.category],
            ['Budget', `$${job.budget}`],
            ['Duration', job.duration],
        ],
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235] }, // Tailwind blue-600
    });

    const finalY = (doc as any).lastAutoTable.finalY || 70;

    doc.setFontSize(12);
    doc.text("Description:", 14, finalY + 15);
    const descriptionLines = doc.splitTextToSize(job.description, 180);
    doc.text(descriptionLines, 14, finalY + 22);

    const descriptionHeight = descriptionLines.length * 5; 
    const skillsY = finalY + 22 + descriptionHeight + 5;

    doc.text("Required Skills:", 14, skillsY);
    const skillsText = doc.splitTextToSize(job.skills.join(', '), 180);
    doc.text(skillsText, 14, skillsY + 7);

    doc.save(`Fiche_de_Poste_${job.title.replace(/\s/g, '_')}.pdf`);
  };

  const handleShareWhatsApp = () => {
    const message = `Check out this new job posting on Albansah:\n\n*${job.title}*\n\n*Budget:* $${job.budget}\n*Duration:* ${job.duration}\n\n*Description:*\n${job.description.substring(0, 150)}...\n\nFind more details here: ${window.location.origin}${window.location.pathname}#/job/${job.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareEmail = () => {
    const subject = `New Job Posting: ${job.title}`;
    const body = `Hello,\n\nPlease find the details for the new job opening below:\n\nTitle: ${job.title}\nBudget: $${job.budget}\nDuration: ${job.duration}\n\nDescription:\n${job.description}\n\nSkills: ${job.skills.join(', ')}\n\nView the full job post here: ${window.location.origin}${window.location.pathname}#/job/${job.id}`;
    const mailtoUrl = `mailto:albansah.x@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="text-center p-4 transition-all animate-in fade-in zoom-in duration-500">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Job Posted Successfully!</h2>
        <p className="mt-2 text-slate-600">Your job "{job.title}" is now live. You can share it or download the job description below.</p>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={generatePdf} className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-800 px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                <PdfIcon className="w-5 h-5" /> Download PDF
            </button>
            <button onClick={handleShareWhatsApp} className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-800 px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                <WhatsappIcon className="w-5 h-5" /> WhatsApp
            </button>
            <button onClick={handleShareEmail} className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-800 px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                <EmailIcon className="w-5 h-5" /> Email
            </button>
        </div>
        
        <div className="mt-8 border-t pt-6">
             <a href="#/jobs" className="font-semibold text-blue-600 hover:text-blue-800">
                View Job Listings &rarr;
            </a>
            <p className="text-slate-500 text-sm mt-4">
                Or, <button onClick={onPostAnother} className="font-semibold text-blue-600 hover:underline">post another job</button>.
            </p>
        </div>
    </div>
  );
};

const PostJobPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submittedJob, setSubmittedJob] = React.useState<Job | null>(null);

  const handleFormSuccess = (job: Job) => {
    setSubmittedJob(job);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedJob(null);
  };
  
  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        {isSuccess && submittedJob ? (
            <SubmissionSuccess job={submittedJob} onPostAnother={handleReset} />
        ) : (
        <>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Post a New Job
                </h2>
                <p className="mt-3 text-slate-600 text-lg">
                    Find the perfect freelancer for your project on Albansah.
                </p>
            </div>
            
            <JobForm onSuccess={handleFormSuccess} />
        </>
        )}
      </div>
    </div>
  );
};

export default PostJobPage;