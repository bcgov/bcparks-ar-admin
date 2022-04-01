#bucket containing the static files to serve out
resource "aws_s3_bucket" "bcgov-parks-ar-admin" {
  bucket = "${var.s3_bucket}-${var.target_env}"
  acl    = "private"

  tags   = {
    Name = var.s3_bucket_name
  }
}

#bucket to hold cloudfront logs#
resource "aws_s3_bucket" "parks-ar-admin-logs" {
  bucket = "${var.s3_bucket}-logs-${var.target_env}"
  acl    = "private"

  tags   = {
    Name = "${var.s3_bucket_name} Logs"
  }
}

#Access ID so CF can read the non-public bucket containing static site files
resource "aws_cloudfront_origin_access_identity" "parks-ar-admin-oai" {
  comment = "Cloud front OAI for BC Parks attendance & revenue admin delivery"
}

#setup a cloudfront distribution to serve out the frontend files from s3 (github actions will push builds there)
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.bcgov-parks-ar-admin.bucket_regional_domain_name
    origin_id   = "${var.origin_id}-${var.target_env}"
    origin_path = "/${var.app_version}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.parks-ar-admin-oai.cloudfront_access_identity_path
    }
  }

  # This origin is for setting up the api to be accessible from the front-end domain
  origin {
    domain_name = var.api_gateway_origin_domain
    origin_id   = var.api_gateway_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.parks-ar-admin-logs.bucket_domain_name
    prefix          = "logs"
  }

  custom_error_response {
    error_code    = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code    = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  ordered_cache_behavior {
    allowed_methods  = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods   = ["GET", "HEAD"]
    path_pattern           = var.api_gateway_path_pattern
    target_origin_id       = var.api_gateway_origin_id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    allowed_methods  = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods   = ["GET", "HEAD"]
    path_pattern           = "/*"
    target_origin_id       = "${var.origin_id}-${var.target_env}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.origin_id}-${var.target_env}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    viewer_protocol_policy = "redirect-to-https"
  }

  # Cache behavior with precedence 1
  # ordered_cache_behavior {
  #   path_pattern     = "/${var.app_version}/*"
  #   allowed_methods  = ["GET", "HEAD", "OPTIONS"]
  #   cached_methods   = ["GET", "HEAD"]
  #   target_origin_id = "${var.origin_id}-${var.target_env}"

  #   forwarded_values {
  #     query_string = false

  #     cookies {
  #       forward = "none"
  #     }
  #   }

  #   min_ttl                = 0
  #   default_ttl            = 3600
  #   max_ttl                = 86400
  #   compress               = true
  #   viewer_protocol_policy = "redirect-to-https"
  # }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  tags = {
    Environment = var.target_env
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
}
