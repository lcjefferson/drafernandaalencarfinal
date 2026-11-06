# Páginas de venda dos e-books

Site estático **somente HTML, CSS e JavaScript** (sem framework). Cada produto tem **uma oferta** na página; **order bump** e upsell ficam no checkout (ex.: Kiwify).

## Estrutura

| Arquivo | Função |
|---------|--------|
| `index.html` | Página inicial estilo “lista de links”: três cards com capa e seta |
| `receitas.html` | Venda: 200 receitas para almoço — Anti Ifood |
| `batidas.html` | Venda: 120 batidas proteicas |
| `lanches.html` | Venda: 75 lanches escolares |
| `assets/covers/*.svg` | Mini capas da home (troque por JPG/WebP se preferir) |
| `css/styles.css` | Estilo único (landings + hub da home) |
| `js/config.js` | **Um link de checkout por produto** (`EBOOK_CHECKOUT`) |
| `js/main.js` | Aplica os links aos botões `data-checkout` |
| `js/landing.js` | Barra de urgência com data e CTA fixo no mobile |
| `arquivos/*.pdf` | Versões geradas dos 3 e-books (capa artística + faixa com arte por receita — veja observação) |
| `scripts/build_pdfs.py` | Regenera os PDFs: `pip install fpdf2 pillow` e `python3 scripts/build_pdfs.py` |
| `scripts/_pdf_build/` | (ignorado no git) imagens temporárias JPG usadas na montagem do PDF |

### PDFs entregues

Arquivos em **`arquivos/`**:

- `ebook-200-receitas-almoco-dra-fernanda-alencar.pdf`
- `ebook-120-batidas-proteicas-dra-fernanda-alencar.pdf`
- `ebook-75-lanches-escolares-dra-fernanda-alencar.pdf`

Cada PDF tem **capa full-bleed**, página de **como usar** com banner, e em cada receita uma **faixa ilustrada** (arte abstrata gerada por código — não é foto de prato). O texto das receitas é **montado automaticamente** por combinações para bater 200 / 120 / 75 itens; **revise** antes de vender (tom, **CRN**, alergênicos, fotos reais se quiser substituir as artes). A mesma saída vai para `arquivos/` e `/opt/cursor/artifacts/` quando o script roda no ambiente do agente.

## Configurar checkout

Edite `js/config.js` com a URL **principal** de cada produto na Kiwify (ou outra plataforma):

```js
window.EBOOK_CHECKOUT = {
  receitas: "https://pay.kiwify.com.br/SEU-LINK-ALMOCOS",
  batidas: "https://pay.kiwify.com.br/SEU-LINK-BATIDAS",
  lanches: "https://pay.kiwify.com.br/SEU-LINK-LANCHES",
};
```

Enquanto uma URL estiver vazia, o clique no botão mostra um aviso para configurar.

## Ver localmente

Na pasta `ebooks-vendas`:

```bash
python3 -m http.server 48291 --bind 127.0.0.1
```

Abra no navegador: `http://127.0.0.1:48291/`

### Baixar o site + PDFs em um ZIP (local)

Há um pacote pronto em **`downloads/ebooks-vendas-site.zip`** (HTML, CSS, JS, `assets/`, `arquivos/*.pdf`, script de PDF; sem `scripts/_pdf_build/`).

Com o servidor acima rodando na pasta `ebooks-vendas`:

`http://127.0.0.1:48291/downloads/ebooks-vendas-site.zip`

Ou copie o arquivo direto do disco: `ebooks-vendas/downloads/ebooks-vendas-site.zip`.

Para **regenerar** o ZIP a partir da raiz do repositório:

```bash
zip -r ebooks-vendas/downloads/ebooks-vendas-site.zip ebooks-vendas \
  -x "ebooks-vendas/scripts/_pdf_build/*" \
  -x "ebooks-vendas/downloads/*" \
  -x "*.DS_Store"
```

(O segundo `-x` evita embutir o próprio `.zip` dentro do pacote.)

## Personalizar

- **Tipografia:** só **Outfit** (títulos e corpo) em `css/styles.css`, para evitar mistura de fontes. Troque o `@import` do Google Fonts se quiser outra família única.
- **Home (lista de links):** edite `index.html` — nome no `<h1>`, frase no `.hub-lead` e troque o avatar (hoje iniciais **FA**; pode virar `<img class="hub-avatar" ...>`).
- Demais textos e preços: edite cada `*.html` de produto (bloco `#oferta`).
- Cores e fontes das landings: variáveis `--accent` por tema (`.theme-receitas`, etc.) em `css/styles.css`.
