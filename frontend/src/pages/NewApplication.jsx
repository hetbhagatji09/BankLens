import CustomerForm from '../components/prediction/CustomerForm.jsx'

function NewApplication() {
  return (
    <div className="new-application">
      <div className="page-header">
        <h1>New Loan Application</h1>
        <p className="page-description">Enter customer information to evaluate loan eligibility</p>
      </div>
      
      <CustomerForm />
      
      <style jsx>{`
        .new-application {
          animation: fadeIn 0.5s ease-out;
        }
        
        .page-header {
          margin-bottom: var(--space-4);
        }
        
        .page-description {
          color: var(--neutral-600);
          max-width: 600px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default NewApplication