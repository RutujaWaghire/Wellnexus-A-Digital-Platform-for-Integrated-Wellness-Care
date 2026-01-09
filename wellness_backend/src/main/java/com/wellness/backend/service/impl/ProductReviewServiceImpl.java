package com.wellness.backend.service.impl;

import com.wellness.backend.model.ProductReview;
import com.wellness.backend.repository.ProductReviewRepository;
import com.wellness.backend.service.ProductReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductReviewServiceImpl implements ProductReviewService {

    private final ProductReviewRepository reviewRepository;

    public ProductReviewServiceImpl(ProductReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public ProductReview addReview(ProductReview review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<ProductReview> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
}
