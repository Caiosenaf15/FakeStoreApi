const productList = document.querySelector("#product-list");
    const productForm = document.querySelector("#product-form");
    const btn = document.querySelector("#btn");
    const inputBusca = document.querySelector("#idBusca");
    
    let produtos = [];
    let indexAtual = 0;
    
    // Carrega todos os produtos no início
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        produtos = data;
      });
    
    btn.addEventListener("click", () => {
      const idDigitado = inputBusca.value.trim();
    
      // Busca o produto com o ID
      if (idDigitado) {
        fetch(`https://fakestoreapi.com/products/${idDigitado}`)
          .then(res => {
            if (!res.ok) throw new Error("Produto não encontrado");
            return res.json();
          })
          .then(product => {
            productList.innerHTML = ""; // limpa a lista para mostrar só o produto com o id buscado
            const li = document.createElement("li");
            li.innerHTML = `ID: ${product.id}<br>
                            <strong>${product.title}</strong><br>
                            R$ ${product.price}<br>
                            <em>${product.category}</em><br>
                            ${product.description}`;
            productList.appendChild(li);
          })
          .catch(err => {
            productList.innerHTML = "Produto não encontrado.";
            console.error(err);
          });
    
        return;
      }
    
      // Se não digitou nada, mostra o próximo da lista
      if (produtos.length === 0) {
        productList.innerHTML = "Carregando produtos...";
        return;
      }
    
      const product = produtos[indexAtual];
      const li = document.createElement("li");
      li.innerHTML = `ID: ${product.id}<br>
                      <strong>${product.title}</strong><br>
                      R$ ${product.price}<br>
                      <em>${product.category}</em><br>
                      ${product.description}`;
      productList.appendChild(li);
    
      indexAtual++;
      if (indexAtual >= produtos.length) {
        btn.disabled = true;
        btn.textContent = "Todos os produtos foram listados";
      }
    });
    
      
    

    // POST - Criar novo produto
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProduct = {
        title: document.querySelector("#title").value,
        price: parseFloat(document.querySelector("#price").value),
        description: document.querySelector("#description").value,
        category: document.querySelector("#category").value
      };

      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        alert("Produto criado com sucesso!");
        console.log("Resposta da API:", data);
      });
    });