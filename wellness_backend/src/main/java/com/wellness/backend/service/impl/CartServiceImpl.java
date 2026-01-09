package com.wellness.backend.service.impl;

import com.wellness.backend.model.CartItem;
import com.wellness.backend.repository.CartRepository;
import com.wellness.backend.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository repository;

    public CartServiceImpl(CartRepository repository) {
        this.repository = repository;
    }

    @Override
    public CartItem addToCart(Long userId, Long productId, Integer quantity) {
        CartItem item = new CartItem();
        item.setUserId(userId);
        item.setProductId(productId);
        item.setQuantity(quantity);
        return repository.save(item);
    }

    @Override
    public List<CartItem> getCart(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        repository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        List<CartItem> items = repository.findByUserId(userId);
        repository.deleteAll(items);
    }
}
