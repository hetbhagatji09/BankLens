import { Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import watermarkImg from '../../assets/BankLens.jpg'; // adjust the path as needed

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  watermark: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: '50%',
    opacity: 0.1,
    zIndex: 0
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #cccccc',
    paddingBottom: 10,
    zIndex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C2C5B'
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
    zIndex: 1
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #cccccc',
    paddingVertical: 8
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'left'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
    zIndex: 1
  }
});

function RejectedLoansPDF({ loans }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark image */}
          <Image src={watermarkImg} style={styles.watermark} />

        <View style={styles.header}>
          <Text style={styles.title}>Rejected Loans Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>Customer</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>Reason</Text>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Confidence</Text>
          </View>

          {loans.map(loan => (
            <View key={loan.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>#{loan.id}</Text>
              <Text style={styles.tableCell}>{loan.name}</Text>
              <Text style={styles.tableCell}>₹{loan.loanAmount.toLocaleString()}</Text>
              <Text style={styles.tableCell}>{loan.loanPurpose}</Text>
              <Text style={styles.tableCell}>
                {new Date(loan.createdDate).toLocaleDateString()}
              </Text>
              <Text style={styles.tableCell}>{(loan.confidence*100).toFixed(2)}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>BankLens - Loan Prediction System</Text>
        </View>
      </Page>
    </Document>
  );
}

export default RejectedLoansPDF;