terraform {
  source = "../src"
}

include {
  path = find_in_parent_folders()
}

locals {
  app_version = get_env("app_version", "")
  s3_bucket = get_env("s3_bucket", "")
  origin_id = get_env("origin_id", "")
  api_gateway_origin_domain = get_env("api_gateway_origin_domain", "")
  api_gateway_origin_id = get_env("api_gateway_origin_id", "")
  api_gateway_path_pattern = get_env("api_gateway_path_pattern", "")
  ssl_cert_arn             = get_env("ssl_cert_arn", "")
}

generate "prod_tfvars" {
  path              = "prod.auto.tfvars"
  if_exists         = "overwrite"
  disable_signature = true
  contents          = <<-EOF
app_version = "${local.app_version}"
s3_bucket = "${local.s3_bucket}"
origin_id = "${local.origin_id}"
api_gateway_origin_domain = "${local.api_gateway_origin_domain}"
api_gateway_origin_id = "${local.api_gateway_origin_id}"
api_gateway_path_pattern = "${local.api_gateway_path_pattern}"
enable_vanity_domain = true
vanity_domain_certs_arn = "${local.ssl_cert_arn}"
vanity_domain = ["attendance-revenue.bcparks.ca"]
EOF
}