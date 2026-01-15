package com.infosys.Wellness.dto;

public class OrderRequestDTO {

    private Long productId;
    private int quantity;

    // ===== GETTERS & SETTERS =====

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
