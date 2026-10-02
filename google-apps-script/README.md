# Publicação do formulário

1. Abra [Google Apps Script](https://script.google.com/home) com a conta que edita a planilha.
2. Crie um projeto e cole o conteúdo de `Code.gs`.
3. Em **Implantar → Nova implantação**, escolha **App da Web**.
4. Selecione **Executar como: sua conta** e **Quem tem acesso: qualquer pessoa**.
5. Autorize, copie a URL que termina em `/exec` e substitua `const FORM_ENDPOINT = '';` no `index.html`.

A planilha **forms da pagina rudnick**, aba `Página1`, receberá: data/hora, nome, telefone, e-mail, faturamento e resposta aberta. Não use a URL `/dev`, pois ela exige login.