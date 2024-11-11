<template>
  <div class="shopping-list">
    <TitleComponent text="Lista de Compras" />
    <div class="shopping-list__category-list">
      <div
        v-for="(category, categoryIndex) in productCategories"
        :key="categoryIndex"
        class="shopping-list__category"
      >
        <h3 class="shopping-list__category-title">
          <i :class="category.icon" class="shopping-list__category-icon"></i>
          {{ category.name }}
        </h3>
        <div
          v-for="(productGroup, groupIndex) in category.groups"
          :key="groupIndex"
          class="shopping-list__group"
        >
          <h4 class="shopping-list__group-title">
            <i :class="productGroup.icon" class="shopping-list__group-icon"></i>
            {{ productGroup.name }}
          </h4>
          <ul class="shopping-list__items">
            <li
              v-for="(product, productIndex) in productGroup.items"
              :key="productIndex"
              class="shopping-list__item"
            >
              <span class="shopping-list__item-name">{{ product.name }}</span>
              <input
                type="number"
                min="1"
                v-model="product.quantity"
                class="shopping-list__input"
                @change="updateList(category.name, productGroup.name, product)"
              />
              <button
                class="shopping-list__button"
                @click="addToShoppingList(product)"
              >
                <i class="fas fa-cart-plus"></i> Adicionar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <TitleComponent text="Sua Lista de Compras" />
    <ul class="shopping-list__shopping-list">
      <li
        v-for="(item, index) in shoppingList"
        :key="index"
        class="shopping-list__shopping-item"
      >
        <span class="shopping-list__item-name"
          >{{ item.name }} - {{ item.quantity }}</span
        >
        <button
          class="shopping-list__remove-button"
          @click="removeFromShoppingList(index)"
        >
          <i class="fas fa-trash"></i> Remover
        </button>
      </li>
    </ul>

    <div class="shopping-list__button-container">
      <button class="shopping-list__share-button" @click="shareList">
        <i class="fab fa-whatsapp"></i> Compartilhar via WhatsApp
      </button>

      <button class="shopping-list__logout-button" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    </div>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
  components: {
    TitleComponent,
  },
  data() {
    return {
      productCategories: [
        {
          name: 'Alimentos Básicos',
          icon: 'fas fa-cogs',
          groups: [
            {
              name: 'Grãos e Cereais',
              icon: 'fas fa-bread-slice',
              items: [
                { name: 'Arroz (branco)', quantity: 1 },
                { name: 'Feijão (preto)', quantity: 1 },
                { name: 'Milho para pipoca', quantity: 1 },
              ],
            },
            {
              name: 'Farinha e Derivados',
              icon: 'fas fa-cookie',
              items: [
                { name: 'Farinha de trigo', quantity: 1 },
                { name: 'Amido de milho', quantity: 1 },
              ],
            },
          ],
        },
      ],
      shoppingList: [],
    }
  },
  methods: {
    addToShoppingList(product) {
      const existingItem = this.shoppingList.find(
        (item) => item.name === product.name
      )
      if (existingItem) {
        existingItem.quantity = product.quantity
      } else {
        this.shoppingList.push({ ...product })
      }
    },
    removeFromShoppingList(index) {
      this.shoppingList.splice(index, 1)
    },
    updateList(category, group, product) {
      console.log(`Atualizado: ${category} > ${group} > ${product.name}`)
    },
    shareList() {
      const listText = this.shoppingList
        .map((item) => `${item.name} - ${item.quantity}`)
        .join('\n')

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(listText)}`

      window.open(whatsappUrl, '_blank')
    },
    async logout() {
      try {
        await signOut(auth)
        this.$store.commit('setAuthentication', false)
        this.$router.push('/login')
      } catch (error) {
        console.error('Erro ao fazer logout: ', error.message)
      }
    },
  },
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.shopping-list {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.shopping-list__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.shopping-list__category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.shopping-list__category {
  flex: 1 1 calc(50% - 20px);
  box-sizing: border-box;
  min-width: 280px;
}

@media (max-width: 768px) {
  .shopping-list__category-list {
    flex-direction: column;
  }

  .shopping-list__category {
    flex: 1 1 100%;
    min-width: 100%;
  }
}

.shopping-list__category-title {
  font-size: 1.35rem;
  margin: 10px 0;
  color: #007bff;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.shopping-list__category-title:hover {
  color: #0056b3;
}

.shopping-list__category-icon {
  margin-right: 10px;
  font-size: 1.8rem;
}

.shopping-list__group-title {
  font-size: 1.2rem;
  margin: 8px 0;
  color: #555;
  display: flex;
  align-items: center;
}

.shopping-list__group-icon {
  margin-right: 10px;
  font-size: 1.6rem;
}

.shopping-list__items {
  list-style-type: none;
  padding: 0;
}

.shopping-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.shopping-list__item:hover {
  background-color: #e2e6ea;
  cursor: pointer;
}

.shopping-list__item-name {
  flex-grow: 1;
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

.shopping-list__input {
  width: 75px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.shopping-list__input:focus {
  border-color: #007bff;
}

.shopping-list__button {
  padding: 8px 15px;
  margin-left: 12px;
  font-size: 1.1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shopping-list__button:hover {
  background-color: #218838;
}

.shopping-list__shopping-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.shopping-list__shopping-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease;
}

.shopping-list__shopping-item:hover {
  background-color: #f1f1f1;
}

.shopping-list__remove-button {
  padding: 8px 12px;
  font-size: 1.1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shopping-list__remove-button:hover {
  background-color: #c82333;
}

.shopping-list__share-button {
  padding: 12px 25px;
  font-size: 1.3rem;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;
}

.shopping-list__share-button i {
  margin-right: 10px;
}

.shopping-list__share-button:hover {
  background-color: #128c7e;
}

.shopping-list__button-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.shopping-list__share-button,
.shopping-list__logout-button {
  flex: 1;
  height: 50px;
  font-size: 1.1rem;
  padding: 12px 0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopping-list__share-button i,
.shopping-list__logout-button i {
  margin-right: 10px;
}

@media (max-width: 768px) {
  .shopping-list__button-container {
    flex-direction: column;
  }

  .shopping-list__share-button,
  .shopping-list__logout-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .shopping-list__logout-button {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .shopping-list__title {
    font-size: 1.5rem;
  }

  .shopping-list__category-title {
    font-size: 1.2rem;
  }

  .shopping-list__group-title {
    font-size: 1rem;
  }

  .shopping-list__input {
    width: 60px;
  }

  .shopping-list__button {
    font-size: 1rem;
  }

  .shopping-list__remove-button {
    font-size: 1rem;
  }

  .shopping-list__share-button {
    font-size: 1.2rem;
  }
}
.shopping-list__logout-button {
  padding: 12px 20px;
  font-size: 1.1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.shopping-list__logout-button:hover {
  background-color: #c82333;
}
</style>
