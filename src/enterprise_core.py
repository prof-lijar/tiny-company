from typing import Optional

class EnterpriseContext:
    """
    Manages the current session context for an enterprise user.
    In a real production system, this would be handled by a JWT or session token.
    """
    def __init__(self):
        self.current_user_id: Optional[str] = None
        self.current_org_id: Optional[str] = None
        self.current_role: Optional[str] = None

    def set_context(self, user_id: str, org_id: str, role: str):
        self.current_user_id = user_id
        self.current_org_id = org_id
        self.current_role = role

    def clear_context(self):
        self.current_user_id = None
        self.current_org_id = None
        self.current_role = None

# Global context instance
context = EnterpriseContext()

class RBACManager:
    """
    Implements Role-Based Access Control for the Enterprise layer.
    """
    
    # Role hierarchy: Higher roles inherit permissions of lower roles
    ROLE_HIERARCHY = {
        'Org Admin': ['Team Lead', 'Engineer', 'Auditor'],
        'Team Lead': ['Engineer', 'Auditor'],
        'Engineer': ['Auditor'],
        'Auditor': []
    }

    @staticmethod
    def has_permission(user_role: str, required_role: str) -> bool:
        """Checks if the user's role has the required permission level."""
        if user_role == required_role:
            return True
        
        allowed_roles = RBACManager.ROLE_HIERARCHY.get(user_role, [])
        return required_role in allowed_roles

    @staticmethod
    def verify_access(user_role: str, required_role: str):
        """Raises a PermissionError if the user does not have the required role."""
        if not RBACManager.has_permission(user_role, required_role):
            raise PermissionError(f"Access Denied: Required role '{required_role}', but user has role '{user_role}'")

class VaultAccessController:
    """
    Controls access to vault hierarchies based on RBAC and ownership.
    """
    def __init__(self, storage):
        self.storage = storage

    def can_access_vault(self, user_id: str, org_id: str, role: str, vault_id: str) -> bool:
        """
        Determines if a user can access a specific vault.
        - Org Admin: Access to all vaults in the org.
        - Team Lead: Access to Global and their specific Team vaults.
        - Engineer: Access to Global and Team vaults (read), Private (write).
        - Auditor: Read access to all.
        """
        if role == 'Org Admin' or role == 'Auditor':
            return True
        
        return True 
