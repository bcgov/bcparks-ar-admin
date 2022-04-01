# variables.tf

variable "target_env" {
  description = "AWS workload account env (e.g. dev, test, prod, sandbox, unclass)"
}

variable "target_aws_account_id" {
  description = "AWS workload account id"
}

variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "ca-central-1"
}

variable "s3_bucket_name" {
  description = "Human readable S3 bucket name for labels"
  type        = string
  default     = "parks-ar"
}

variable "origin_id" {
  description = "Origin Id"
  type        = string
  default     = "parks-admin"
}

variable "budget_amount" {
  description = "The amount of spend for the budget. Example: enter 100 to represent $100"
  default     = "100.0"
}

variable "common_tags" {
  description = "Common tags for created resources"
  default = {
    Application = "BC Parks Attendance & Revenue Admin"
  }
}

variable "app_version" {
  description = "app version to deploy"
  type        = string
}

variable "s3_bucket" {
  description = "S3 Bucket containing static web files for CloudFront distribution"
  type        = string
}

variable "api_gateway_origin_domain" {
  description = "Domain name for the current api gateway endpoint"
  type        = string
  default     = "h8asgmakgf.execute-api.ca-central-1.amazonaws.com"
}

variable "api_gateway_origin_id" {
  description = "Origin id for api gateway"
  type        = string
  default     = "api-gateway"
}

variable "api_gateway_path_pattern" {
  description = "path for api gateway"
  type        = string
  default     = "/dev/*"
}

variable "enable_vanity_domain" {
  description = "Enable public vanity domain"
  default     = false
}

variable "vanity_domain" {
  description = "Public vanity domain"
  default     = []
}

variable "vanity_domain_certs_arn" {
  description = "Public vanity domain certs ARN"
  default     = ""
}