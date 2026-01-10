package com.wellness.backend.controller;

import com.wellness.backend.model.ProductReview;
import com.wellness.backend.service.ProductReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ProductReviewController {

    private final ProductReviewService reviewService;

    public ProductReviewController(ProductReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ProductReview> addReview(@RequestBody ProductReview review) {
        return ResponseEntity.ok(reviewService.addReview(review));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductReview>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }
}
