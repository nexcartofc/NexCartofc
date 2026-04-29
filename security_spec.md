# NexCart Security Specification

## Data Invariants
- A product must always have a valid seller.
- An order must always belong to a verified customer.
- Only sellers can list products.
- Customers can only see their own orders.
- Users can only modify their own profiles.

## Dirty Dozen Payloads (Target: DENIED)
1. **Identity Spoofing (Users)**: `{"uid": "attacker_id", "email": "valid@user.com", "fullName": "Victim", "role": "admin"}` where `request.auth.uid` is `attacker_id` but the target document is `victim_id`.
2. **Privilege Escalation**: `{"role": "admin"}` in `update` profile.
3. **Ghost Fields**: `{"id": "123", ..., "isVerifiedSeller": true}` in product create.
4. **Order Hijacking**: `get` request to `/orders/someone_elses_order`.
5. **PII Leak**: `list` request to `/users` by non-admin.
6. **Price Tampering**: `update` product price by non-seller.
7. **Negative Stock**: `{"stock": -1}` in product create.
8. **Malicious ID**: Create product with `{"id": "a".repeat(1500)}`.
9. **Fake Review**: Create review with `rating: 10`.
10. **Timestamp Fraud**: `{"createdAt": 0}` (ignoring server time).
11. **Relational Orphan**: Create order with no items.
12. **Status Cheat**: Customer updates order status to 'delivered'.

## Test Runner (Example Logic)
Tests would verify that all the above payloads return `PERMISSION_DENIED` when attempted by unauthorized users or with invalid data.
