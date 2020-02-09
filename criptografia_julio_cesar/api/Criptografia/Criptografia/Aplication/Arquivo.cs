using Criptografia.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Criptografia.Aplication
{
    public class Arquivo
    {

        public void CriarHashESalvarArquivo(string json)
        {

            var objCodenation = JsonConvert.DeserializeObject<Codenation>(json);
            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(objCodenation.decifrado));
            objCodenation.resumo_criptografico = string.Concat(hash.Select(b => b.ToString("x2")));

            File.WriteAllText(@"C:\dev\projetos\criptografia_julio_cesar\web\json\answer.json", JsonConvert.SerializeObject(objCodenation));
        }

        public CodenationTabela GerarObjetoAtualizado(string json)
        {

            var objCodenation = JsonConvert.DeserializeObject<CodenationTabela>(json);
            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(objCodenation.julioCesar));
            objCodenation.sha1 = string.Concat(hash.Select(b => b.ToString("x2")));

            return objCodenation;

        }


    }
}