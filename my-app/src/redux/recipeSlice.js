




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Firebase Realtime Database Base URL
const BASE_URL = "https://recipesharing-11fc6-default-rtdb.asia-southeast1.firebasedatabase.app/recipes";

// ---------------------------
// Thunks for Realtime Database
// ---------------------------

// ✅ Add a new recipe
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipeData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}.json`, {
        method: "POST",
        body: JSON.stringify({
          ...recipeData,
          createdAt: new Date().toISOString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return { id: data.name, ...recipeData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Fetch all recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}.json`);
      const data = await res.json();
      if (!data) return [];
      return Object.entries(data).map(([id, recipe]) => ({
        id,
        ...recipe,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Edit a recipe
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete a recipe
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/${id}.json`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ---------------------------
// Slice
// ---------------------------
const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter((id) => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------------
      // ADD RECIPE
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------
      // FETCH RECIPES
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------
      // EDIT RECIPE
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.items = state.items.map((recipe) =>
          recipe.id === action.payload.id
            ? { ...recipe, ...action.payload.updatedData }
            : recipe
        );
      })
      .addCase(editRecipe.rejected, (state, action) => {
        state.error = action.payload;
      })

      // -------------------------
      // DELETE RECIPE
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter((recipe) => recipe.id !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// ---------------------------
// Exports
// ---------------------------
export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
