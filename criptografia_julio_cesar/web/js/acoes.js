new Vue({
    el:'#app',
    data:function(){
        return{
            fraseDigitada: "",
            objCodenation:{},
            objTabela:{
                frase:"",
                julioCesar:"",
                sha1:""
            },
            listaObjetosTabela:[]

        }
    },
    mounted:function(){
        this.obterJsonCodenation();
        // ALTERAR O '44352' PELA PORTA DO SEU LOCALHOST
        this.enviarObjetoParaSalvar(this.objCodenation,'https://localhost:44352/api/Criptografia/ReceberObjetoParaSalvar');
        this.enviarJsonParaCodenation();
    },
    methods:{
        obterJsonCodenation: function(){
            var self = this;
            var inicio = { method: 'GET'}

            var req = new XMLHttpRequest();
            req.open('GET','https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=c70242c06c75aa22b40c053b3767687bd4e20a81',false);
            req.send();

            var objJson = JSON.parse(req.response);
            objJson.decifrado = self.descriptografarFraseJulioCesar(objJson.cifrado);
            this.objCodenation = objJson;

        },
        descriptografarFraseJulioCesar: function(frase){

            var arrayLetras = frase.split('');
            var arrayLetrasCorretas = arrayLetras.map(function(letra){

                if(letra ==" " || letra == '.'){
                    return letra;
                }

                letra = letra.charCodeAt(0)-8;

                if(letra<97){
                    letra = letra + 26;
                }

                return String.fromCharCode(letra);


            })

            return arrayLetrasCorretas.toString().replace(/,/g ,'');
        },
        enviarObjetoParaSalvar: function(objeto,url){
            var self = this;

            var req = new XMLHttpRequest();
            req.open('POST',url,false);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send("json="+JSON.stringify(objeto));

            return req.response;

        },
        enviarJsonParaCodenation: function(){
            var self = this;
            var req = new XMLHttpRequest();
            var data = new FormData();

            req.open('GET','json/answer.json',false);
            req.send();
            self.objCodenation = JSON.parse(req.response);

            var oMyBlob = new Blob([req.response], {type : 'application/json'});
            data.append('answer', oMyBlob)

            req.open('POST','https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token='+self.objCodenation.token,false);
            req.send(data);

            console.log(req.response);

            // REQUISIÇÃO SIMPLIFICADA
            // fetch('json/answer.json')
            // .then(function(response){
            //     return response.blob();
            // }).then(function(blob){
                
            //     var data = new FormData();
            //     data.append('answer', blob)
    
            //     var req = new XMLHttpRequest();
            //     req.open('POST','https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token='+self.objCodenation.token,false);
            //     req.send(data);
    
            //     console.log(req.response);
                
            // });
            
        },
        obterDadosTabela: function(){
            var self = this;
            this.objTabela.frase = this.fraseDigitada;

            var arrayLetras = this.objTabela.frase.split('');
            var arrayLetrasCorretas = arrayLetras.map(function(letra){

                if(letra ==" " || letra == '.'){
                    return letra;
                }

                letra = letra.charCodeAt(0)+8;

                if(letra>122){
                    letra = letra - 26;
                }

                return String.fromCharCode(letra);


            })

            this.objTabela.julioCesar = arrayLetrasCorretas.toString().replace(/,/g ,'');
            // ALTERAR O '44352' PELA PORTA DO SEU LOCALHOST
            var resposta = this.enviarObjetoParaSalvar(this.objTabela,'https://localhost:44352/api/Criptografia/ReceberObjetoParaAtualizar');

            self.listaObjetosTabela.push(JSON.parse(resposta))
            this.fraseDigitada = "";
            
        },
        meuLinkedin: function(){
            window.open('https://www.linkedin.com/in/eduardo-marchiori-679965187/');
        }
    }
});
