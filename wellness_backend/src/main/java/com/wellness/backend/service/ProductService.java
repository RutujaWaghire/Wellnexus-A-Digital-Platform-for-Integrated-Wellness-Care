package com.wellness.backend.service;

import com.wellness.backend.model.Product;
import java.util.List;

public interface ProductService {
    Product create(Product product);
    Product update(Long id, Product product);
    void delete(Long id);
    List<Product> getAllProducts();
}
