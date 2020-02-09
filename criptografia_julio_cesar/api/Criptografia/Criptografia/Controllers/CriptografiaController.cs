using Criptografia.Models;
using Criptografia.Aplication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Criptografia.Controllers
{
    public class CriptografiaController : ApiController
    {


        [HttpPost]
        public string ReceberObjetoParaSalvar([FromBody] Tipo json)
        {

            Arquivo arq = new Arquivo();
            arq.CriarHashESalvarArquivo(json.json);

            return "Arquivo salvo com sucesso!";
        }

        [HttpPost]
        public CodenationTabela ReceberObjetoParaAtualizar([FromBody] Tipo json)
        {

            Arquivo arq = new Arquivo();
            var retornoObjeto = arq.GerarObjetoAtualizado(json.json);

            return retornoObjeto;
        }



    }
}
