package com.wellness.backend.service;

import com.wellness.backend.model.CartItem;
import java.util.List;

public interface CartService {

    CartItem addToCart(Long userId, Long productId, Integer quantity);

    List<CartItem> getCart(Long userId);

    void removeFromCart(Long cartItemId);

    void clearCart(Long userId);
}
