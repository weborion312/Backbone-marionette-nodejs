backbone.auth
=============

###Example

  var access_token = 'eNdDwpQ91mlPcGtn9j9F4BFyKtS7GKrrs-68ZcrJ0LnlvmGp',
    expires_in = 1000 * 60 * 120
    
    $.ajax({
      type: 'POST',
      uri: '/',
      headers: {
        access_token: access_token,
        expires_in: expires_in
      }
    })