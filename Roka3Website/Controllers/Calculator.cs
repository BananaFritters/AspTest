using System;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Roka3Website.Controllers
{


    [Route("api/[controller]")]
    public class CalculatorController
    {

        private static readonly NumberFormatInfo DefaultNumberFormat = NumberFormatInfo.InvariantInfo;

        private NumberFormatInfo _FormatInfo = DefaultNumberFormat;


        [HttpGet("[action]/{a}/{b}")]
        public CalculationResult Multiply(double a, double b) => Calculate(() => Calculator.Multiply(a, b));

        [HttpGet("[action]")]
        public CalculationResult Add(double a, double b) => Calculate(() => Calculator.Add(a, b));



        private CalculationResult Calculate(Func<double> calculation)
        {
            CalculationResult result;
            try
            {
                double resultValue = calculation.Invoke();
                result = new CalculationResult(resultValue, _FormatInfo, null);
            }
            catch (Exception ex)
            {
                result = new CalculationResult(double.NaN, _FormatInfo, ex);
            }
            return result;
        }

        [HttpGet("[action]")]
        public void SetCulture(string culture)
        {
            try
            {
                CultureInfo cultureInfo = CultureInfo.GetCultureInfo(culture);

                _FormatInfo = cultureInfo.NumberFormat;
            }
            catch (CultureNotFoundException)
            {
                _FormatInfo = DefaultNumberFormat;
            }
        }



    }


    public class Calculator
    {


        public static double Multiply(double a, double b) => a * b;

        public static double Add(double a, double b) => a + b;

    }


    public class CalculationResult
        :
        IActionResult
    {
        public bool IsValid => Error == null && !double.IsNaN(ResultValue);

        public Exception Error { get; }

        public double ResultValue { get; }

        public string ResultValueFormatted { get; }


        public CalculationResult(double resultValue)
            :
            this(resultValue, System.Globalization.NumberFormatInfo.InvariantInfo, null)
        { }


        public CalculationResult(double resultValue, IFormatProvider formatProvider, Exception error)
        {
            ResultValue = resultValue;
            Error = error;
            ResultValueFormatted = Error != null ? "" : resultValue.ToString(formatProvider);
        }

        public Task ExecuteResultAsync(ActionContext context)
        {
            throw new NotImplementedException();
        }
    }


}
