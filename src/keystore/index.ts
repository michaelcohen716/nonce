import Wallet from 'ethereumjs-wallet-react-native'

type generateOrImportKeystoreProps = {
  password: string
  privateKey?: string | null
}

type keystoreProps = {
  keystore: any
  password: any
}

export async function generateOrImportKeystore(
  props: generateOrImportKeystoreProps
) {
  // use private key if it's given, otherwise generate wallet
  const { password, privateKey } = props

  let wallet

  if (privateKey) {
    wallet = await Wallet.fromPrivateKey(new Buffer(privateKey, 'hex'))
  } else {
    wallet = await Wallet.generate()
  }

  // // ensure it doesnt already exist
  // // let the UI update with a loading spinner...
  const params = {
    n: 1024, // todo, use 65536 for better security
  }
  const keystore = JSON.stringify(await wallet.toV3(password, params))
  const address = wallet.getChecksumAddressString()
  return { keystore, address }
}

export async function derivePkFromKeystore(props: keystoreProps) {
  const { keystore, password } = props
  const wallet = await Wallet.fromV3(keystore, password)
  const pk = wallet.getPrivateKey()
  return pk
}
