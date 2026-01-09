package com.wellness.backend.service;

import com.wellness.backend.model.ProductReview;
import java.util.List;

public interface ProductReviewService {
    ProductReview addReview(ProductReview review);
    List<ProductReview> getReviewsByProduct(Long productId);
}
