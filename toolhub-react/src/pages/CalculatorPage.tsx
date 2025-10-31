import Calculator from '../components/Calculator'
import '../styles/CalculatorPage.css'

function CalculatorPage() {
  return (
    <div className="calculator-page">
      <div className="calculator-page-header">
        <h1>Calculadora</h1>
        <p>Realiza operaciones matemáticas básicas</p>
      </div>
      <div className="calculator-wrapper">
        <Calculator />
      </div>
    </div>
  )
}

export default CalculatorPage
