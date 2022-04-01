terraform {
  required_providers {
    aws = {
      version = "~> 3.74"
      source = "hashicorp/aws"
    }
  }
}

locals {
  common_tags        = var.common_tags
}