#The CNAME record from this cert will need to be added to DNS provider
#uncomment when we have domain name to use
resource "aws_acm_certificate" "ar" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  tags = {
    Environment = var.target_env
    Name        = "Parks AR Admin Cert"
  }

  lifecycle {
    create_before_destroy = true
  }
}
