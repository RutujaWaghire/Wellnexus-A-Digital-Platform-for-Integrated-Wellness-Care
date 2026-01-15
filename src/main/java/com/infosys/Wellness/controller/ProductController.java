package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.Product;
import com.infosys.Wellness.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    // ✅ MANUAL CONSTRUCTOR (NO LOMBOK)
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // PUBLIC - Browse all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // PUBLIC - Get product details
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
