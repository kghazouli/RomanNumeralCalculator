using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using RomanNumeralCalc.Models;
using System.Text.RegularExpressions;

namespace RomanNumeralCalc.Controllers
{
    [RoutePrefix("api/calc")]
    public class CalcController : ApiController
    {
        private static String[] ones = { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };
        private static String[] tens = { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
        private static String[] hundreds = { "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" };
        private static String[] thousands = { "", "M", "MM", "MMM" };

        
        public IHttpActionResult Post([FromBody] CalculationModel calc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            calc.Result = ParseEquation(calc.Equation);
        
            return Ok(calc);
        }

        public int RomanToInt(String s)
        {
            int[] decNum = new int[s.Length];
            int num = 0;
            int i = 0;
            foreach (char c in s)
            {
                switch (c)
                {
                    case 'I':
                        decNum[i] = 1;
                        break;
                    case 'V':
                        decNum[i] = 5;
                        break;
                    case 'X':
                        decNum[i] = 10;
                        break;
                    case 'L':
                        decNum[i] = 50;
                        break;
                    case 'C':
                        decNum[i] = 100;
                        break;
                    case 'D':
                        decNum[i] = 500;
                        break;
                    case 'M':
                        decNum[i] = 1000;
                        break;
                }
                i++;
            }

            for (int j = 0; j < decNum.Length - 1; j++)
            {
                if (decNum[j] < decNum[j + 1])
                {
                    num -= decNum[j];
                }
                else
                {
                    num += decNum[j];
                }
            }
            return num + decNum[decNum.Length - 1];
        }



        public String IntToRoman(int num)
        {
            if (num < 1 || num > 3999)
            {
                return "Error: out of bounds";
            }
            String RomanNumeral = thousands[num / 1000] + hundreds[num / 100 % 10]
                + tens[num / 10 % 10] + ones[num % 10];

            return RomanNumeral;
        }

        public String ParseEquation(String equation)
        {
            String[] equationArray = equation.Split(' ');
            String temp = equationArray[0];
            for(int i=1; i<equationArray.Length; i += 2)
            {
                temp = Operation(temp, equationArray[i + 1], equationArray[i]);
                if (temp.Contains("Error"))
                {
                    return temp;
                }
            }
            return temp; 
        }

        public Boolean IsValidNumeral(String numeral)
        {
            if (numeral.Length == 0) return false;

            Regex regex = new Regex(@"^M{0,3}(CM|D|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$");
            return regex.IsMatch(numeral);
        }

        public String Operation(String num1, String num2, String op)
        {
            if (!IsValidNumeral(num1) || !IsValidNumeral(num2)) return "Error: invalid input";
            int result = 0;
            switch (op)
            {
                case "+":
                    result = RomanToInt(num1) + RomanToInt(num2);
                    break;
                case "-":
                    result = RomanToInt(num1) - RomanToInt(num2);
                    break;
                case "÷":
                    result = RomanToInt(num1) / RomanToInt(num2);
                    break;
                case "×":
                    result = RomanToInt(num1) * RomanToInt(num2);
                    break;
                default:
                    return "Error";
            }
            return IntToRoman(result);
        }
    }
}